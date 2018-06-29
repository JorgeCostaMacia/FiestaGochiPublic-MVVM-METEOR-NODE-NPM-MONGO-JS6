import './order_admin_videos.html';

import {Template} from "meteor/templating";

Template.Order_admin_videos.onCreated(function(){
    Session.set('order', 1);
    Session.set('camp', 'nombre');
});

Template.Order_admin_videos.helpers({
    nombreOrderActive(){
        return Session.get('camp') === "nombre";
    },
    urlOrderActive(){
        return Session.get('camp') === "url";
    },
    jugadoresOrderActive(){
        return Session.get('camp') === "jugadores";
    },
    orderType(){
        if(Session.get('order') === 1){
            return 'glyphicon glyphicon-chevron-left';
        }
        else {
            return 'glyphicon glyphicon-chevron-right';
        }
    }
});

Template.Order_admin_videos.events({
    'click #nombreOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'nombre');

        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }
    },
    'click #urlOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'url');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }
    },
    'click #jugadoresOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'jugadores');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }
    }
});