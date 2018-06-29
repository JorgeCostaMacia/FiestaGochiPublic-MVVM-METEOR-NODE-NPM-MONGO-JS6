import {Accounts} from "meteor/accounts-base";
import {Img_personajes} from "../../api/img_personajes/img_personajes";
import {Partidas} from "../../api/partidas/partidas";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import {Log_api_error} from "../../api/log_api_error/log_api_error";
import moment from 'moment';

Accounts.onCreateUser(function (options, user) {
    try {
        Partidas.insert({
            _id: user._id,
            lvl: 1,
            personaje: Img_personajes.findOne()._id,
            stats: {energia: 100, alegria: 100, sed: 100, cansancio: 100},
            consumibles: {bizcocho_risa: 10, gyn_tonic: 10, caramelo_energetico: 10, recarga: 1}
        });

        user.profile = options.profile;

        if (options.profile.roles === "admin") {
            user.emails[0].verified = true;
        }

        return user;
    }
    catch (err) {
        let errDoc = {
            api: 'partidas',
            action: 'Accounts.onCreateUser',
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