import './order_admin_usuarios.html';

import {Template} from "meteor/templating";

Template.Order_admin_usuarios.onCreated(function(){
    Session.set('order', -1);
    Session.set('camp', 'creacion');
});

Template.Order_admin_usuarios.helpers({
    nickOrderActive(){
        return Session.get('camp') === "nick";
    },
    emailOrderActive(){
        return Session.get('camp') === "email";
    },
    creacionOrderActive(){
        return Session.get('camp') === "creacion";
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

Template.Order_admin_usuarios.events({
    'click #nickOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'nick');

        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }
    },
    'click #emailOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'email');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }
    },
    'click #creacionOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'creacion');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }

    }
});