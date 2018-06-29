import {Log_users} from "./log_users";
import {Meteor} from "meteor/meteor";
import {Log_api_error} from "../log_api_error/log_api_error";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'log_users.insert'(doc){
        try {
            doc.id_usuario = Meteor.userId();
            doc.connection = this.connection.clientAddress;
            Log_users.insert(doc);
        }
        catch (err) {
            let errDoc = {
                api: 'log_users',
                action: 'log_users.insert',
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