import './videos_admin.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Videos} from "../../../api/videos/videos";

Template.Videos_admin.onCreated(function () {
    Session.set('equals', []);
});

Template.Videos_admin.helpers({
    videos(){
        let equals = [];

        if(Session.get('camp') === "nombre"){
            _.forEach(Videos.find({}).fetch(), function (value,index) {
                if (value.nombre.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0){
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Videos.find({_id: {$in: equals} }, {sort: {nombre: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "url"){
            _.forEach(Videos.find({}).fetch(), function (value,index) {
                if (value.url.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Videos.find({_id: {$in: equals}}, {sort: {url: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "jugadores"){
            _.forEach(Videos.find({}).fetch(), function (value,index) {
                if (value.jugadores.toString().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Videos.find({_id: {$in: equals}}, {sort: {jugadores: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "date"){
            return Videos.find({}, {sort: {date: -1}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
    },
    unJugador(){
        if(this.jugadores === 1){
            return 'selected';
        }
    },
    dosJugadores(){
        if(this.jugadores === 2){
            return 'selected';
        }
    },
    tresJugadores(){
        if(this.jugadores === 3){
            return 'selected';
        }
    },
    cuatroJugadores(){
        if(this.jugadores === 4){
            return 'selected';
        }
    }
});

Template.Videos_admin.events({
    'click .borrar_video': function(e){
        e.preventDefault();

        Meteor.call('videos.admin_remove', this._id, function (err, res) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo borrar');
            }
            else {
                Msj_modal.open_success("Se ha borrado correctamente");
            }
        });
    },
    'submit .form_video': function(e){
        e.preventDefault();

        let doc_video = this;

        doc_video.nombre = $('.nombre', e.target).val();
        doc_video.url = $('.url', e.target).val();
        doc_video.jugadores = 1 * $('.jugadores', e.target).val();

        Meteor.call('videos.admin_update', doc_video, function (err, res) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});