import { Meteor } from 'meteor/meteor';
import { Partidas } from '../partidas.js';

Meteor.publish('partidas', function () {
    return Partidas.find({_id: Meteor.userId()});
});

Meteor.publish('partidas.admin', function () {
    if(Meteor.user().profile.roles === "admin"){
        return Partidas.find();
    }
});