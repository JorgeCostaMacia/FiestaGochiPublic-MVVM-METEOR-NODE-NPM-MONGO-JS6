import './pagination_admin_personajes.html';

import {Template} from "meteor/templating";
import {Img_personajes} from "../../../api/img_personajes/img_personajes";

Template.Pagination_admin_personajes.onCreated(function(){
    Session.set('pageActual', 0);
    Session.set('anteriorControl', false);
    Session.set('siguienteControl', false);
});


Template.Pagination_admin_personajes.helpers({
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
        if(Session.get('camp') === "nombre"){
            if(Img_personajes.find({_id: {$in: Session.get('equals')}}, {sort: {nombre: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
        else if(Session.get('camp') === "alt"){
            if(Img_personajes.find({_id: {$in: Session.get('equals')}}, {sort: {alt: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
        else if(Session.get('camp') === "url"){
            if(Img_personajes.find({_id: {$in: Session.get('equals')}}, {sort: {url_png: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
    }
});

Template.Pagination_admin_personajes.events({
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