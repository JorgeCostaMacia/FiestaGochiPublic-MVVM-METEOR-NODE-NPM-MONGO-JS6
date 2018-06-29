import './order_foro.html';

import {Template} from "meteor/templating";

Template.Order_foro.onCreated(function(){
    Session.set('order', -1);
    Session.set('camp', 'date');
});

Template.Order_foro.helpers({
    nickOrderActive(){
        return Session.get('camp') === "nick";
    },
    dateOrderActive(){
        return Session.get('camp') === "date";
    },
    msjOrderActive(){
        return Session.get('camp') === "msj";
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

Template.Order_foro.events({
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
    'click #dateOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'date');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }

    },
    'click #msjOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'msj');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }
    }
});