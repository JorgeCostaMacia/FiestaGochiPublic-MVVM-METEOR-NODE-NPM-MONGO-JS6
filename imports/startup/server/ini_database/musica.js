import {Meteor} from "meteor/meteor";
import {Musica} from "../../../api/musica/musica";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if (Musica.find().count() === 0) {
        try{
            Musica.insert({
                nombre: 'Latino',
                url: 'http://5.39.66.128:8012/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: 'Dance',
                url: 'http://5.39.66.128:8004/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: 'Remember',
                url: 'http://5.39.66.128:8006/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: 'House',
                url: 'http://5.39.66.128:8005/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: 'Tech house',
                url: 'http://5.39.66.128:8008/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: 'Trance',
                url: 'http://5.39.66.128:8010/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: 'Techno',
                url: 'http://5.39.66.128:8009/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: 'Hard',
                url: 'http://5.39.66.128:8003/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: "80's",
                url: 'http://5.39.66.128:8018/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: "90's",
                url: 'http://5.39.66.128:8000/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Musica.insert({
                nombre: "Trap",
                url: 'http://audio-online.net:8014/live',
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            let errDoc = {
                api: 'musica',
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