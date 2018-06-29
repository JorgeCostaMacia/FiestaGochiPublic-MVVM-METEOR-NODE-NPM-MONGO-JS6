import './order_admin_personajes.html';

import {Template} from "meteor/templating";

Template.Order_admin_personajes.onCreated(function(){
    Session.set('order', 1);
    Session.set('camp', 'nombre');
});

Template.Order_admin_personajes.helpers({
    nombreOrderActive(){
        return Session.get('camp') === "nombre";
    },
    urlOrderActive(){
        return Session.get('camp') === "url";
    },
    altOrderActive(){
        return Session.get('camp') === "alt";
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

Template.Order_admin_personajes.events({
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
    'click #altOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'alt');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }

    }
});