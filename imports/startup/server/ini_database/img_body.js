import {Meteor} from "meteor/meteor";
import {Img_body} from "../../../api/img_body/img_body.js";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Img_body.find().count() === 0) {
        try {
            Img_body.insert({
                _id: 'background_home',
                nombre: "Background home",
                alt: "Imágen background home",
                url: "https://jorgecostamacia.me/img/background_body.png"
            });
        }
        catch (err) {
            let errDoc = {
                api: 'img_body',
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