import {Meteor} from "meteor/meteor";
import {Foro} from "../../../api/foro/foro";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if (Foro.find().count() === 0) {
        try {
            Foro.insert({
                id_usuario: Meteor.users.find({username: 'FiestaGochi'})._id,
                nick: 'FiestaGochi',
                mensaje: 'Bienvenido, sé el primero en hablar',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            let errDoc = {
                api: 'foro',
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