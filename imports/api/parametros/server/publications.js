import { Meteor } from 'meteor/meteor';
import {Parametros} from "../parametros";

Meteor.publish('parametros.cron', function () {
  return Parametros.find({_id: 'cron'});
});

Meteor.publish('parametros.juego', function () {
    return Parametros.find({_id: 'juego'});
});

Meteor.publish('parametros.partida', function () {
    return Parametros.find({_id: 'partida'});
});