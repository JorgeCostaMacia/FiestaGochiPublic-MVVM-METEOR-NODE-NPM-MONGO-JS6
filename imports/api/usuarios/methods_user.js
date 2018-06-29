import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Log_api_error} from "../log_api_error/log_api_error";
import {Rankings} from "../ranking/ranking";
import {Foro} from "../foro/foro";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'usuarios.registrar'(doc){
        if(!Meteor.user()){
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
                    action: 'usuarios.registrar',
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
    'usuarios.recuperar'(doc){
        if(!Meteor.user()) {
            try {
                let user = Accounts.findUserByEmail(doc.email);
                if(user){
                    if(!user.emails[0].verified){
                        throw new Meteor.Error('verificado', 'No se ha verificado');
                    }
                    Accounts.sendResetPasswordEmail(Accounts.findUserByEmail(doc.email)._id);
                }
                else{
                    throw new Meteor.Error('registrado', "No se ha registrado");
                }
            }
            catch (err) {
                let errDoc = {
                    api: 'usuarios',
                    action: 'usuarios.recuperar',
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
    'usuarios.cambiarNick'(newUsername){
        if(Meteor.user()){
            try {
                Accounts.setUsername(Meteor.userId(), newUsername);

                let userForo = Foro.find({id_usuario: Meteor.userId()}).fetch();
                let userRanking = Rankings.find({id_usuario: Meteor.userId()}).fetch();

                _.forEach(userForo, function (foroDoc) {
                    Foro.update({_id: foroDoc._id}, {$set: {nick: newUsername}});
                });

                _.forEach(userRanking, function (rankingDoc) {
                    Rankings.update({_id: rankingDoc._id}, {$set: {nick: newUsername}});
                });
            }
            catch (err) {
                let errDoc = {
                    api: 'usuarios',
                    action: 'usuarios.cambiarNick',
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
    'usuarios.cambiarEmail'(newEmail){
        if(Meteor.user()){
            try {
                let actualEmail = Meteor.user().emails[0].address;
                Accounts.addEmail(Meteor.userId(), newEmail);
                Accounts.removeEmail(Meteor.userId(), actualEmail);
                Accounts.sendVerificationEmail(Meteor.userId());
                Meteor.users.update(Meteor.userId(), {$unset: {has_cron_clean_db: ""}});
            }
            catch (err) {
                let errDoc = {
                    api: 'usuarios',
                    action: 'usuarios.cambiarEmail',
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
    'usuarios.cambiarAvisos'(newAvisos) {
        if (Meteor.user()) {
            try {
                Meteor.users.update(Meteor.userId(), {$set: {'profile.avisos': newAvisos}});
            }
            catch (err) {
                let errDoc = {
                    api: 'usuarios',
                    action: 'usuarios.cambiarAvisos',
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