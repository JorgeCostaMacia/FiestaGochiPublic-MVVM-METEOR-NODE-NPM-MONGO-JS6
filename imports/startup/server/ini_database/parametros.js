import {Meteor} from "meteor/meteor";
import {Parametros} from "../../../api/parametros/parametros.js";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Parametros.find().count() === 0) {
        try{
            Parametros.insert({
                _id: 'cron',
                interval: 3600000,
                interval_stats: 1,
                interval_consumibles: 2,
                menosUno50: 10,
                menosDos50: 15,
                menosTres50: 20,
                menosUno30: 5,
                menosDos30: 10,
                menosTres30: 15,
                menosStats: 10
            });
            Parametros.insert({
                _id: 'juego',
                color: ['#00ffff', '#adff2f', '#ffa300', '#dc00fb'],
                interval: 499,
                puntosAcierto: 500,
                puntosFallo: 100
            });
            Parametros.insert({
                _id: 'partida',
                statsMas100: 20,
                statsMas50: 5,
                consuRecarga: 5,
                jugarStats: 30,
                jugarEnergia: 50,
            });
        }
        catch (err) {
            let errDoc = {
                api: 'parametros',
                action: 'insert ini server',
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
    }
});