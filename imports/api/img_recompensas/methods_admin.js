import {Meteor} from "meteor/meteor";
import {Log_api_error} from "../log_api_error/log_api_error";
import {Img_recompensas} from "./img_recompensas";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'img_recarga.admin_update'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Img_recompensas.update('recarga', {$set: doc});
            }
            catch (err) {
                let errDoc = {
                    api: 'img_recarga',
                    action: 'img_recarga.admin_update',
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
    'img_daleGas.admin_update'(doc) {
        if (Meteor.user() && Meteor.user().profile.roles === "admin") {
            try {
                Img_recompensas.update('daleGas', {$set: doc});
            }
            catch (err) {
                let errDoc = {
                    api: 'img_daleGas',
                    action: 'img_daleGas.admin_update',
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