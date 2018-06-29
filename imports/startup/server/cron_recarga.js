import {Meteor} from "meteor/meteor";
import {Parametros} from "../../api/parametros/parametros";
import {Log_cron} from "../../api/log_cron/log_cron";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import {Partidas} from "../../api/partidas/partidas";
import {Log_api_error} from "../../api/log_api_error/log_api_error";
import moment from 'moment';

Meteor.startup(() => {
    let parametros = Parametros.findOne({_id: 'cron'});
    const cron_recarga = new Cron(parametros.interval);

    cron_recarga.addJob(parametros.interval_consumibles, function(){
        try {
            Log_cron.insert({
                action: 'update_recargas',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });

            let partidas = Partidas.find().fetch();
            _.forEach(partidas, function (partida) {
                let userDoc = Meteor.users.findOne({_id: partida._id});

                if (!_.isUndefined(userDoc) && userDoc.emails[0].verified === true) {
                    partida.consumibles.recarga = 1;
                    Partidas.update(partida._id, {$set: {consumibles: partida.consumibles}});
                    if (userDoc.profile.avisos === "Recibir") {
                        Email.send({
                            to: userDoc.emails[0].address,
                            from: 'FiestaGochi <fiestagochi@gmail.com>',
                            subject: 'Ha llegado tu camello a la fiesta',
                            html: EmailTemplates.consuBody()
                        });
                    }
                }
            });
        }
        catch (err) {
            let errDoc = {
                api: 'cron_recarga',
                action: 'cron_recarga',
                date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                error: err
            };

            errDoc._id = Log_api_error.insert(errDoc);

            Email.send({
                to: 'suportfiestagochi@gmail.com',
                from: 'FiestaGochi <fiestagochi@gmail.com>',
                subject: 'Error ' + errDoc._id,
                html: EmailTemplates.errorBody(errDoc)
            });

            throw err;
        }
    });
});