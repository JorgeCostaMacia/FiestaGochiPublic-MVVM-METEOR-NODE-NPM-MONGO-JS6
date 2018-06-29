import { Meteor } from 'meteor/meteor';
import { Videos } from '../videos.js';
import { Partidas } from '/imports/api/partidas/partidas.js';

Meteor.publish('videos.jug1', function () {
  if(Meteor.user()){
      return Videos.find({jugadores: 1}, {limit: Partidas.findOne({_id: Meteor.userId()}).lvl});
  }
});

Meteor.publish('videos.jug2', function () {
    if(Meteor.user()) {
        return Videos.find({jugadores: 2}, {limit: Partidas.findOne({_id: Meteor.userId()}).lvl});
    }
});

Meteor.publish('videos.jug3', function () {
    if(Meteor.user()) {
        return Videos.find({jugadores: 3}, {limit: Partidas.findOne({_id: Meteor.userId()}).lvl});
    }
});

Meteor.publish('videos.jug4', function () {
    if(Meteor.user()) {
        return Videos.find({jugadores: 4}, {limit: Partidas.findOne({_id: Meteor.userId()}).lvl});
    }
});

Meteor.publish('videos.admin_jug1', function () {
    if(Meteor.user() && Meteor.user().profile.roles === "admin"){
        return Videos.find({jugadores: 1});
    }
});

Meteor.publish('videos.admin_jug2', function () {
    if(Meteor.user() && Meteor.user().profile.roles === "admin") {
        return Videos.find({jugadores: 2});
    }
});

Meteor.publish('videos.admin_jug3', function () {
    if(Meteor.user() && Meteor.user().profile.roles === "admin") {
        return Videos.find({jugadores: 3});
    }
});

Meteor.publish('videos.admin_jug4', function () {
    if(Meteor.user() && Meteor.user().profile.roles === "admin") {
        return Videos.find({jugadores: 4});
    }
});
