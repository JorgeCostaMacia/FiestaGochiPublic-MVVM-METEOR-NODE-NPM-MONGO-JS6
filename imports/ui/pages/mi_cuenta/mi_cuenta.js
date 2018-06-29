import './mi_cuenta.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/form_cambiar_nick/form_cambiar_nick.js';
import '/imports/ui/components/form_cambiar_email/form_cambiar_email.js';
import '/imports/ui/components/form_cambiar_avisos/form_cambiar_avisos.js';
import '/imports/ui/components/form_cambiar_password/form_cambiar_password.js';
import '/imports/ui/components/pj_carousel/pj_carousel.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Partidas} from '/imports/api/partidas/partidas.js';
import {Img_personajes} from "../../../api/img_personajes/img_personajes";

Template.Page_mi_cuenta.onCreated(
    function(){
        Meteor.subscribe('partidas', function(){
            Session.set('partidasSub', 'ready');
        });
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('img.personajes', function(){
            Session.set('imgPersonajes', 'ready');
        });
    }
);

Template.Page_mi_cuenta.helpers({
    email(){
        if(Meteor.user()){
            return Meteor.user().emails[0].address;
        }
    },
    nombrePersonaje(){
        if(Session.get('partidasSub') === "ready" && Session.get('imgPersonajes') === "ready" ){
            return Img_personajes.findOne(Partidas.findOne().personaje).nombre;
        }
    },
    lvl(){
        if(Session.get('partidasSub') === "ready"){
            return Partidas.findOne().lvl;
        }
    },
    modNickActive(){
        return Session.get('inputActive') === "modNick";
    },
    modEmailActive(){
        return Session.get('inputActive') === "modEmail";
    },
    modAvisosActive(){
        return Session.get('inputActive') === "modAvisos";
    },
    modPassActive(){
        return Session.get('inputActive') === "modPass";
    },
    modPjActive(){
        return Session.get('inputActive') === "modPj";
    }
});

Template.Page_mi_cuenta.events({
    'click #butModNick': function (e) {
        e.preventDefault();

        if(Session.get('inputActive') !== "modNick"){
            Session.set('inputActive', 'modNick');
        }
        else {
            Session.set('inputActive', '');
            $('#modNick').val('');
        }
    },
    'click #butModEmail': function (e) {
        e.preventDefault();

        if(Session.get('inputActive') !== "modEmail"){
            Session.set('inputActive', 'modEmail');
        }
        else {
            Session.set('inputActive', '');
            $('#modEmail').val('');
        }
    },
    'click #butModPass': function (e) {
        e.preventDefault();

        if(Session.get('inputActive') !== "modPass"){
            Session.set('inputActive', 'modPass');
        }
        else {
            Session.set('inputActive', '');
            $("#modPassActual").val('');
            $("#modPass").val('');
            $("#modPassConf").val('');
        }
    },
    'click #butModPj': function(e) {
        e.preventDefault();

        if(Session.get('inputActive') !== "modPj"){
            Session.set('inputActive', 'modPj');
        }
        else {
            Session.set('inputActive', '');
        }
    },
    'click #butModAvisos': function(e) {
        e.preventDefault();

        if(Session.get('inputActive') !== "modAvisos"){
            Session.set('inputActive', 'modAvisos');
        }
        else {
            Session.set('inputActive', '');
        }
    },
    'click #resetPartida': function(e){
        e.preventDefault();

        Meteor.call('partidas.reset', function () {
            Session.set('inputActive', '');
        });
    }
});