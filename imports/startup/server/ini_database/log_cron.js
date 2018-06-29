import {Meteor} from "meteor/meteor";
import {Log_cron} from "../../../api/log_cron/log_cron";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Log_cron.find().count() === 0){
        try{
            Log_cron.insert({
                action: 'start_server',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            let errDoc = {
                api: 'log_cron',
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