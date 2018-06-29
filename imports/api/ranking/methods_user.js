import { Meteor } from 'meteor/meteor';
import { Rankings } from './ranking.js';
import { Partidas } from '/imports/api/partidas/partidas.js';
import {Log_api_error} from "../log_api_error/log_api_error";
import {EmailTemplates} from "../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.methods({
    'ranking.crear': function(puntos) {
        if(Meteor.user()) {
            try {
                Rankings.insert({
                    id_usuario: Meteor.userId(),
                    nick: Meteor.user().username,
                    lvl: Partidas.findOne({_id: Meteor.userId()}).lvl,
                    puntos: puntos
                });

                let partida = Partidas.findOne({_id: Meteor.userId()});
                partida.lvl += 1;
                Partidas.update(Meteor.userId(), {$set: partida});
            }
            catch (err) {
                let errDoc = {
                    api: 'ranking',
                    action: 'ranking.crear',
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