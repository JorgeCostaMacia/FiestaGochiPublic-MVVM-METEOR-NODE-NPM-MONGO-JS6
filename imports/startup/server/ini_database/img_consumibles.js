import {Meteor} from "meteor/meteor";
import {Img_consumibles} from "../../../api/img_consumibles/img_consumibles";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Img_consumibles.find().count() === 0){
        try{
            Img_consumibles.insert({
                _id: 'gyn',
                nombre: "Gyn tonic",
                alt: "Imágen gyn tonic",
                url: "https://jorgecostamacia.me/img/gyn_tonic.png"
            });
            Img_consumibles.insert({
                _id: 'bizcocho',
                nombre: "Bizcocho de la risa",
                alt: "Imágen bizcocho de la risa",
                url: "https://jorgecostamacia.me/img/bizcocho_risa.png"
            });
            Img_consumibles.insert({
                _id: 'caramelo',
                nombre: "Caramelo energético",
                alt: "Imágen caramelo energético",
                url: "https://jorgecostamacia.me/img/caramelo_energetico.png"
            });
        }
        catch (err) {
            let errDoc = {
                api: 'img_consumibles',
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