import {Rankings} from "../../../api/ranking/ranking";
import {Meteor} from "meteor/meteor";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Rankings.find().count() === 0) {
        try{
           let users = Meteor.users.find().fetch();

            for(let i = 0; i < 5; i++){
                for(let j = 1; j < 11; j++){
                    _.forEach(users, function (user) {
                        if(user.emails[0].verified){
                            Rankings.insert({
                                id_usuario: user._id,
                                nick: user.username,
                                lvl: j,
                                puntos: Math.floor(Math.random() * (20000 - 2000) + 2000)
                            });
                        }
                    });
                }
            }

        }
        catch (err) {
            let errDoc = {
                api: 'ranking',
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