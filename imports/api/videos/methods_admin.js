import {Meteor} from "meteor/meteor";
import {Videos} from './videos.js';
import {Log_api_error} from "../log_api_error/log_api_error";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'videos.admin_insert'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            doc.date = moment().format('YYYY-MM-DD, HH:mm:ss');

            try {
                Videos.insert(doc);
            }
            catch (err) {
                let errDoc = {
                    api: 'videos',
                    action: 'videos.admin_insert',
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
    'videos.admin_remove'(id_video){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Videos.remove(id_video);
            }
            catch (err) {
                let errDoc = {
                    api: 'videos',
                    action: 'videos.admin_remove',
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
    'videos.admin_update'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Videos.update(doc._id, {$set: doc});
            }
            catch (err) {
                let errDoc = {
                    api: 'videos',
                    action: 'videos.admin_update',
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