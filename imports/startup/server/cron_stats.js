import {Log_cron} from "../../api/log_cron/log_cron";
import {Meteor} from "meteor/meteor";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import {Partidas} from "../../api/partidas/partidas";
import {Parametros} from "../../api/parametros/parametros";
import {Log_api_error} from "../../api/log_api_error/log_api_error";
import moment from 'moment';

Meteor.startup(() => {
    let parametros = Parametros.findOne({_id: 'cron'});
    const cron_stats = new Cron(parametros.interval);

    cron_stats.addJob(parametros.interval_stats, function () {
        try {
            Log_cron.insert({
                action: 'update_stats',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });

            let partidas = Partidas.find().fetch();
            _.forEach(partidas, function (partida) {
                let userDoc = Meteor.users.findOne({_id: partida._id});


                if (!_.isUndefined(userDoc) && userDoc.emails[0].verified === true) {
                    partida.stats.cansancio -= parametros.menosStats;
                    partida.stats.sed -= parametros.menosStats;
                    partida.stats.alegria -= parametros.menosStats;

                    if (partida.stats.cansancio < 30 && partida.stats.sed >= 30 && partida.stats.alegria >= 30) {
                        partida.stats.energia -= parametros.menosUno30;
                    }
                    else if (partida.stats.cansancio >= 30 && partida.stats.sed < 30 && partida.stats.alegria >= 30) {
                        partida.stats.energia -= parametros.menosUno30;
                    }
                    else if (partida.stats.cansancio >= 30 && partida.stats.sed >= 30 && partida.stats.alegria < 30) {
                        partida.stats.energia -= parametros.menosUno30;
                    }
                    else if (partida.stats.cansancio < 30 && partida.stats.sed < 30 && partida.stats.alegria >= 30) {
                        partida.stats.energia -= parametros.menosDos30;
                    }
                    else if (partida.stats.cansancio >= 30 && partida.stats.sed < 30 && partida.stats.alegria < 30) {
                        partida.stats.energia -= parametros.menosDos30;
                    }
                    else if (partida.stats.cansancio < 30 && partida.stats.sed >= 30 && partida.stats.alegria < 30) {
                        partida.stats.energia -= parametros.menosDos30;
                    }
                    else if (partida.stats.cansancio < 30 && partida.stats.sed < 30 && partida.stats.alegria < 30) {
                        partida.stats.energia -= parametros.menosTres30;
                    }
                    else if (partida.stats.cansancio < 50 && partida.stats.sed < 50 && partida.stats.alegria < 50) {
                        partida.stats.energia -= parametros.menosTres50;
                    }
                    else if (partida.stats.cansancio < 50 && partida.stats.sed < 50 && partida.stats.alegria >= 50) {
                        partida.stats.energia -= parametros.menosDos50;
                    }
                    else if (partida.stats.cansancio < 50 && partida.stats.sed >= 50 && partida.stats.alegria < 50) {
                        partida.stats.energia -= parametros.menosDos50;
                    }
                    else if (partida.stats.cansancio >= 50 && partida.stats.sed < 50 && partida.stats.alegria < 50) {
                        partida.stats.energia -= parametros.menosDos50;
                    }
                    else if (partida.stats.cansancio < 50 && partida.stats.sed >= 50 && partida.stats.alegria >= 50) {
                        partida.stats.energia -= parametros.menosUno50;
                    }
                    else if (partida.stats.cansancio >= 50 && partida.stats.sed >= 50 && partida.stats.alegria < 50) {
                        partida.stats.energia -= parametros.menosUno50;
                    }
                    else if (partida.stats.cansancio >= 50 && partida.stats.sed < 50 && partida.stats.alegria >= 50) {
                        partida.stats.energia -= parametros.menosUno50;
                    }

                    if (partida.stats.cansancio < 0) {
                        partida.stats.cansancio = 0;
                    }
                    if (partida.stats.sed < 0) {
                        partida.stats.sed = 0;
                    }
                    if (partida.stats.alegria < 0) {
                        partida.stats.alegria = 0;
                    }
                    if (partida.stats.energia < 0) {
                        partida.stats.energia = 0;
                    }

                    Partidas.update(partida._id, {$set: {stats: partida.stats}});

                    if (partida.stats.energia <= 0) {
                        partida.lvl = 1;
                        partida.stats.cansancio = 100;
                        partida.stats.sed = 100;
                        partida.stats.alegria = 100;
                        partida.stats.energia = 100;
                        partida.consumibles.gyn_tonic = 10;
                        partida.consumibles.bizcocho_risa = 10;
                        partida.consumibles.caramelo_energetico = 10;
                        partida.consumibles.recarga = 1;

                        Partidas.update(partida._id, {
                            $set: {
                                lvl: partida.lvl,
                                stats: partida.stats,
                                consumibles: partida.consumibles
                            }
                        });
                        if (userDoc.profile.avisos === "Recibir") {
                            Email.send({
                                to: userDoc.emails[0].address,
                                from: 'FiestaGochi <fiestagochi@gmail.com>',
                                subject: 'El sueño ha podido contigo',
                                html: EmailTemplates.statsBody(partida, 'No has podido seguir el ritmo', 'Te han echado del garito por quedarte dormido, vuelve a entrar para empezar')
                            });
                        }
                    }
                    else if (partida.stats.energia <= 25) {
                        if (userDoc.profile.avisos === "Recibir") {
                            Email.send({
                                to: userDoc.emails[0].address,
                                from: 'FiestaGochi <fiestagochi@gmail.com>',
                                subject: 'Tienes mala cara...deberías hecharle un vistazo',
                                html: EmailTemplates.statsBody(partida, 'Tienes mala cara...', 'Vas a dejar que te de el bajón?')
                            });
                        }
                    }
                    else if (partida.stats.energia <= 50) {
                        if (userDoc.profile.avisos === "Recibir") {
                            Email.send({
                                to: userDoc.emails[0].address,
                                from: 'FiestaGochi <fiestagochi@gmail.com>',
                                subject: 'Parece que alguien esta pensando en rajarse....',
                                html: EmailTemplates.statsBody(partida, 'Colega vas a medio gas', 'Estas pensando en rajarte?')
                            });
                        }
                    }
                }
            });
        }
        catch (err) {
            let errDoc = {
                api: 'cron_stats',
                action: 'cron_stats',
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