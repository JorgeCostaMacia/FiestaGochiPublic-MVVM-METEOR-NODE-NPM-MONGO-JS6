import './order_ranking.html';

import {Template} from "meteor/templating";

Template.Order_ranking.onCreated(function(){
    Session.set('order', 1);
    Session.set('camp', 'lvl');
});

Template.Order_ranking.helpers({
    nickOrderActive(){
        return Session.get('camp') === "nick";
    },
    lvlOrderActive(){
        return Session.get('camp') === "lvl";
    },
    puntosOrderActive(){
        return Session.get('camp') === "puntos";
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

Template.Order_ranking.events({
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
    'click #lvlOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'lvl');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }

    },
    'click #puntosOrder': function(e){
        e.preventDefault();
        Session.set('camp', 'puntos');
        if(Session.get('order') === 1){
            Session.set('order', -1);
        }
        else {
            Session.set('order', 1);
        }
    }
});