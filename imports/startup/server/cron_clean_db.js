import {Meteor} from "meteor/meteor";
import {Log_cron} from "../../api/log_cron/log_cron";
import {Foro} from "../../api/foro/foro";
import {Log_users} from "../../api/log_users/log_users";
import {Rankings} from "../../api/ranking/ranking";
import {Partidas} from "../../api/partidas/partidas";
import {Log_api_error} from "../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import {Log_server} from "../../api/log_server/log_server";
import moment from 'moment';

Meteor.startup(() => {
    const cron_clean_db = new Cron(3600000);

    cron_clean_db.addJob(24, function () {
        try {
            Log_cron.insert({
                action: 'clean_db',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });

            let users = Meteor.users.find().fetch();
            _.forEach(users, function (userDoc) {
                if (userDoc.emails[0].verified === false && userDoc.profile.roles === "user") {
                    let userLog = Log_users.findOne({id_usuario: userDoc._id});

                    if(!_.isUndefined(userDoc.has_cron_clean_db) || _.isUndefined(userLog)){
                        Meteor.users.remove(userDoc._id);
                        Partidas.remove(userDoc._id);
                        Foro.remove({id_usuario: userDoc._id});
                        Rankings.remove({id_usuario: userDoc._id});
                    }
                }
            });

            let log_cron = Log_cron.find({}, {sort: {date: -1}}).fetch();
            if (log_cron.length > 100) {
                for (let i = 100; i < log_cron.length; i++) {
                    Log_cron.remove({_id: log_cron[i]._id});
                }
            }

            let foro = Foro.find({}, {sort: {date: -1}}).fetch();
            if (foro.length > 100) {
                for (let i = 100; i < foro.length; i++) {
                    Foro.remove({_id: foro[i]._id});
                }
            }

            let log_users = Log_users.find({}, {sort: {date: -1}}).fetch();
            if (log_users.length > 100) {
                for (let i = 100; i < log_users.length; i++) {
                    Log_users.remove({_id: log_users[i]._id});
                }
            }

            for(let j = 1; j < 11; j++){
                let rankings = Rankings.find({lvl: j}, {sort: {puntos: -1}}).fetch();
                if (rankings.length > 15) {
                    for (let i = 15; i < rankings.length; i++) {
                        Rankings.remove({_id: rankings[i]._id});
                    }
                }
            }

            let log_server = Log_server.find({}, {sort: {date: -1}}).fetch();
            if (log_server.length > 50) {
                for (let i = 50; i < log_server.length; i++) {
                    Log_server.remove({_id: log_server[i]._id});
                }
            }
        }
        catch (err) {
            let errDoc = {
                api: 'cron_clean_db',
                action: 'cron_clean_db',
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