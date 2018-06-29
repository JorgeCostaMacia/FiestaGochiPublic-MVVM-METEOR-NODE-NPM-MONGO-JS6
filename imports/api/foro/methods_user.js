import { Meteor } from 'meteor/meteor';
import { Foro } from './foro.js';
import {Log_api_error} from "../log_api_error/log_api_error";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'foro.insert'(msjText){
        if(Meteor.user()){
            try {
                Foro.insert({
                    id_usuario: Meteor.userId(),
                    nick: Meteor.user().username,
                    mensaje: msjText,
                    date: moment().format('YYYY-MM-DD, HH:mm:ss')
                });
            }
            catch (err) {
                let errDoc = {
                    api: 'foro',
                    action: 'foro.insert',
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