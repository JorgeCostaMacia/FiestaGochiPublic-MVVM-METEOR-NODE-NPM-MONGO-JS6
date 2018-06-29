import './pagination_admin_usuarios.html';

import {Template} from "meteor/templating";

Template.Pagination_admin_usuarios.onCreated(function(){
    Session.set('pageActual', 0);
    Session.set('anteriorControl', false);
    Session.set('siguienteControl', false);
});

Template.Pagination_admin_usuarios.helpers({
    pageActual() {
        return Session.get('pageActual') + 1;
    },
    anterior(){
        if(Session.get('pageActual') === 0){
            Session.set('anteriorControl', false);
            return 'disabled';
        }
        else{
            Session.set('anteriorControl', true);
        }
    },
    siguiente(){
        if(Session.get('camp') === "nick"){
            if(Meteor.users.find({_id: {$in: Session.get('equals')}}, {sort: {username: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
        else if(Session.get('camp') === "email"){
            if(Meteor.users.find({_id: {$in: Session.get('equals')}}, {sort: {'emails.0.address': Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
        else if(Session.get('camp') === "creacion"){
            if(Meteor.users.find({_id: {$in: Session.get('equals')}}, {sort: {createdAt: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
    }
});

Template.Pagination_admin_usuarios.events({
    'click #anterior': function(e){
        if(Session.get('anteriorControl')) {
            Session.set('pageActual', Session.get('pageActual') - 1);
        }
        else {
            e.preventDefault();
        }
    },
    'click #siguiente': function(e){
        if(Session.get('siguienteControl')) {
            Session.set('pageActual', Session.get('pageActual') + 1);
        }
        else {
            e.preventDefault();
        }
    }
});