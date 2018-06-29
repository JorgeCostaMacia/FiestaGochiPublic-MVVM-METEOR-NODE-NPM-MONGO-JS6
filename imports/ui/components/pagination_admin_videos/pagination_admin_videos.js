import './pagination_admin_videos.html';

import {Template} from "meteor/templating";
import { Videos } from '/imports/api/videos/videos.js';

Template.Pagination_admin_videos.onCreated(function(){
    Session.set('pageActual', 0);
    Session.set('anteriorControl', false);
    Session.set('siguienteControl', false);
});

Template.Pagination_admin_videos.helpers({
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
            if(Videos.find({_id: {$in: Session.get('equals')}}, {sort: {nombre: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
        else if(Session.get('camp') === "url"){
            if(Videos.find({_id: {$in: Session.get('equals')}}, {sort: {url: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
        else if(Session.get('camp') === "jugadores"){
            if(Videos.find({_id: {$in: Session.get('equals')}}, {sort: {jugadores: Session.get('order')}, skip: (Session.get('pageActual') + 1 ) * 10, limit: 10 }).count() === 0){
                Session.set('siguienteControl', false);
                return 'disabled';
            }
            else {
                Session.set('siguienteControl', true);
            }
        }
    }
});

Template.Pagination_admin_videos.events({
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