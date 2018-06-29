import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    try{
        if(Meteor.users.find({'emails.0.address': "staffiestagochi@gmail.com"}).count() === 0){
            Accounts.createUser({
                username: 'Staf',
                email: 'staffiestagochi@gmail.com',
                password: '***********',
                profile: {
                    avisos: 'No recibir',
                    roles: "admin"
                }
            });
        }
        if(Meteor.users.find({'emails.0.address': "suportfiestagochi@gmail.com"}).count() === 0){
            Accounts.createUser({
                username: 'Support',
                email: 'suportfiestagochi@gmail.com',
                password: '***********',
                profile: {
                    avisos: 'No recibir',
                    roles: "admin"
                }
            });
        }
        if(Meteor.users.find({'emails.0.address': "fiestagochi@gmail.com"}).count() === 0){
            Accounts.createUser({
                username: 'FiestaGochi',
                email: 'fiestagochi@gmail.com',
                password: '***********',
                profile: {
                    avisos: 'No recibir',
                    roles: "admin"
                }
            });
        }
    }
    catch (err) {
        let errDoc = {
            api: 'users',
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
});