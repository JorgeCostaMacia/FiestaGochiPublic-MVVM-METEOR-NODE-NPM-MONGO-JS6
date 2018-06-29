import './order_admin_musica.html';

import {Template} from "meteor/templating";

Template.Order_admin_musica.onCreated(function(){
    Session.set('order', 1);
    Session.set('camp', 'nombre');
});

Template.Order_admin_musica.helpers({
    nombreOrderActive(){
        return Session.get('camp') === "nombre";
    },
    urlOrderActive(){
        return Session.get('camp') === "url";
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

Template.Order_admin_musica.events({
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
    }
});