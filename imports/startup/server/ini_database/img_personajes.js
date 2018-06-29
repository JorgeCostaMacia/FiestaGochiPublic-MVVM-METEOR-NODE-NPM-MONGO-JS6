import {Meteor} from "meteor/meteor";
import {Img_personajes} from "../../../api/img_personajes/img_personajes.js";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Img_personajes.find().count() === 0) {
        try{
            Img_personajes.insert({
                nombre: "El Jony",
                alt: "Personaje El Jony juego FiestaGochi",
                url_png: "https://jorgecostamacia.me/img/elJony.png",
                url_gif: "https://jorgecostamacia.me/img/elJony.gif",
                url_carrousel: 'https://jorgecostamacia.me/img/elJony_carousel.png',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Img_personajes.insert({
                nombre: "El Kevin",
                alt: "Personaje El Kevin juego FiestaGochi",
                url_png: "https://jorgecostamacia.me/img/elKevin.png",
                url_gif: "https://jorgecostamacia.me/img/elKevin.gif",
                url_carrousel: 'http://jorgecostamacia.me/img/elKevin_carousel.png',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Img_personajes.insert({
                nombre: "La Jeny",
                alt: "Personaje La Jeny juego FiestaGochi",
                url_png: "https://jorgecostamacia.me/img/laJeny.png",
                url_gif: "https://jorgecostamacia.me/img/laJeny.gif",
                url_carrousel: 'https://jorgecostamacia.me/img/laJeny_carousel.png',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Img_personajes.insert({
                nombre: "La Vane",
                alt: "Personaje La Vane juego FiestaGochi",
                url_png: "https://jorgecostamacia.me/img/laVane.png",
                url_gif: "https://jorgecostamacia.me/img/laVane.gif",
                url_carrousel: 'https://jorgecostamacia.me/img/laVane_carousel.png',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            let errDoc = {
                api: 'img_personajes',
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