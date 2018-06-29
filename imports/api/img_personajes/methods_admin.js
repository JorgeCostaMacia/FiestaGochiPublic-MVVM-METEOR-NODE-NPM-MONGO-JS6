import {Meteor} from "meteor/meteor";
import {Log_api_error} from "../log_api_error/log_api_error";
import {Img_personajes} from "./img_personajes.js";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'img_personaje.admin_insert'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            doc.date = moment().format('YYYY-MM-DD, HH:mm:ss');

            try {
                Img_personajes.insert(doc);
            }
            catch (err) {
                let errDoc = {
                    api: 'img_personajes',
                    action: 'img_personaje.admin_insert',
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
    'img_personaje.admin_remove'(id_personaje){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Img_personajes.remove(id_personaje);
            }
            catch (err) {
                let errDoc = {
                    api: 'img_personajes',
                    action: 'img_personaje.admin_remove',
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
    'img_personaje.admin_update'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Img_personajes.update(doc._id, {$set: doc});
            }
            catch (err) {
                let errDoc = {
                    api: 'img_personajes',
                    action: 'img_personaje.admin_update',
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