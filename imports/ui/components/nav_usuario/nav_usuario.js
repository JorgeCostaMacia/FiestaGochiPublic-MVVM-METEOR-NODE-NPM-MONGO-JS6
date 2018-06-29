import './nav_usuario.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Nav_usuario.events({
    'click #logout' : function (e) {
        e.preventDefault();
        Session.set('partidasSub', 'cargando');
        Meteor.logout();
    }
});

Template.Nav_usuario.helpers({
    userAdmin(){
        return Meteor.user() && Meteor.user().profile.roles === "admin";
    }
});