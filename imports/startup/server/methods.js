import {Meteor} from "meteor/meteor";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import {Log_api_error} from "../../api/log_api_error/log_api_error";
import moment from 'moment';

Meteor.methods({
    'email.bienvenido': function () {
        try {
            Email.send({
                to: Meteor.user().emails[0].address,
                from: 'FiestaGochi <fiestagochi@gmail.com>',
                subject: 'Bienvenido a FiestaGochi',
                html: EmailTemplates.bienvenido()
            });
        }
        catch (err) {
            let errDoc = {
                api: 'Email',
                action: 'Email.send',
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