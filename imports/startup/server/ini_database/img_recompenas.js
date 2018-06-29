import {Meteor} from "meteor/meteor";
import {Img_recompensas} from "../../../api/img_recompensas/img_recompensas.js";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Img_recompensas.find().count() === 0){
        try{
            Img_recompensas.insert({
                _id: 'daleGas',
                nombre: "Dale gas",
                alt: "Imágen dale gas",
                url: "https://jorgecostamacia.me/img/dale_gas.png"
            });
            Img_recompensas.insert({
                _id: 'recarga',
                nombre: "Recarga",
                alt: "Imágen recarga",
                url: "https://jorgecostamacia.me/img/recarga.png"
            });
        }
        catch (err) {
            let errDoc = {
                api: 'img_recompensas',
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