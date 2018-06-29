import {Meteor} from "meteor/meteor";
import {Log_cron} from "../../api/log_cron/log_cron";
import {Email} from "meteor/email";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Log_api_error} from "../../api/log_api_error/log_api_error";
import {Accounts} from "meteor/accounts-base";
import moment from 'moment';

Meteor.startup(() => {
    const cron_users = new Cron(3600000);

    cron_users.addJob(1, function () {
        try{
            Log_cron.insert({
                action: 'cron_users verified',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });

            let users = Meteor.users.find().fetch();
            _.forEach(users, function (userDoc) {
                if (userDoc.emails[0].verified === false) {
                    Accounts.sendVerificationEmail(userDoc._id);
                }
            });
        }
        catch (err) {
            let errDoc = {
                api: 'cron_users',
                action: 'cron_users verified',
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

    cron_users.addJob(24, function () {
        try {
            Log_cron.insert({
                action: 'cron_users activity',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });

            let users = Meteor.users.find().fetch();
            _.forEach(users, function (userDoc) {
                if (userDoc.emails[0].verified === false && userDoc.profile.roles === "user") {

                    if (_.isUndefined(userDoc.has_cron_clean_db)) {
                        Meteor.users.update({_id: userDoc._id}, {$set: {has_cron_clean_db: true}});
                    }
                }
            });
        }
        catch (err) {
            let errDoc = {
                api: 'cron_users',
                action: 'cron_users activity',
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