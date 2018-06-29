import './pagination_foro.html';

import {Template} from "meteor/templating";
import { Foro } from '/imports/api/foro/foro.js';

Template.Pagination_foro.onCreated(function(){
    Session.set('pageActual', 0);
    Session.set('anteriorControl', false);
    Session.set('siguienteControl', false);
});

Template.Pagination_foro.helpers({
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
            if(Foro.find({_id: {$in: Session.get('equals')} }, {sort: {nick: Session.get('order')}, skip: (Session.get('pageActual') + 1) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }

        }
        else if(Session.get('camp') === "date"){
            if(Foro.find({_id: {$in: Session.get('equals')}}, {sort: {date: Session.get('order')}, skip: (Session.get('pageActual') + 1) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
        else if(Session.get('camp') === "msj") {
            if(Foro.find({_id: {$in: Session.get('equals')}}, {sort: {mensaje: Session.get('order')}, skip: (Session.get('pageActual') + 1) * 10, limit: 10}).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
    }
});

Template.Pagination_foro.events({
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
