import {Meteor} from "meteor/meteor";
import {Log_api_error} from "../log_api_error/log_api_error";
import {Accounts} from "meteor/accounts-base";
import {Partidas} from "../partidas/partidas";
import {Foro} from "../foro/foro";
import {Rankings} from "../ranking/ranking";
import {Log_users} from "../log_users/log_users";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'users.admin_insert'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            doc.profile = {
                avisos: 'Recibir',
                roles: "user"
            };
            try {
                let userId =  Accounts.createUser(doc);
                Accounts.sendVerificationEmail(userId);
                return userId;
            }
            catch (err) {
                let errDoc = {
                    api: 'usuarios',
                    action: 'users.admin_insert',
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
    'users.admin_remove'(id_usuario){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                Meteor.users.remove(id_usuario);
                Partidas.remove(id_usuario);
                Foro.remove({id_usuario: id_usuario});
                Rankings.remove({id_usuario: id_usuario});
                Log_users.remove({id_usuario: id_usuario});
            }
            catch (err) {
                let errDoc = {
                    api: 'users',
                    action: 'users.admin_remove',
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
    'users.admin_update'(doc){
        if(Meteor.user() && Meteor.user().profile.roles === "admin"){
            try {
                let currentData = Meteor.users.findOne(doc._id);

                if(currentData.profile.roles === "user"){
                    if(currentData.username !== doc.username){
                        Accounts.setUsername(currentData._id, doc.username);

                        let userForo = Foro.find({id_usuario: currentData._id}).fetch();
                        let userRanking = Rankings.find({id_usuario: currentData._id}).fetch();

                        _.forEach(userForo, function (foroDoc) {
                            Foro.update({_id: foroDoc._id}, {$set: {nick: doc.username}});
                        });

                        _.forEach(userRanking, function (rankingDoc) {
                            Rankings.update({_id: rankingDoc._id}, {$set: {nick: doc.username}});
                        });
                    }
                    if(currentData.emails[0].address !== doc.emails[0].address){
                        let actualEmail = currentData.emails[0].address;
                        Accounts.addEmail(currentData._id, doc.emails[0].address);
                        Accounts.removeEmail(currentData._id, actualEmail);
                        Accounts.sendVerificationEmail(currentData._id);
                        Meteor.users.update(currentData._id, {$unset: {has_cron_clean_db: ""}});
                    }
                    if(currentData.profile !== doc.profile){
                        Meteor.users.update(currentData._id, {$set: {profile:{roles: 'user', avisos: doc.profile.avisos}}});
                    }
                }
            }
            catch (err) {
                let errDoc = {
                    api: 'users',
                    action: 'users.admin_update',
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