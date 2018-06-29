import {Meteor} from "meteor/meteor";
import { Parametros } from './parametros.js';
import {Log_api_error} from "../log_api_error/log_api_error";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'parametros.admin_cron_update'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Parametros.update({_id: 'cron'}, {$set: doc});
            }
            catch (err) {
                let errDoc = {
                    api: 'parametros_cron',
                    action: 'parametros.admin_cron_update',
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
    },
    'parametros.admin_juego_update'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Parametros.update({_id: 'juego'}, {$set: doc});
            }
            catch (err) {
                let errDoc = {
                    api: 'parametros_juego',
                    action: 'parametros.admin_juego_update',
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
    },
    'parametros.admin_partida_update'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Parametros.update({_id: 'partida'}, {$set: doc});
            }
            catch (err) {
                let errDoc = {
                    api: 'parametros_partida',
                    action: 'parametros.admin_partida_update',
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
    }
});