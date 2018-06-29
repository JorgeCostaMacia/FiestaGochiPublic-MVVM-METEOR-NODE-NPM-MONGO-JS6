import './personajes_admin.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Img_personajes} from "../../../api/img_personajes/img_personajes";

Template.Personajes_admin.onCreated(function () {
    Session.set('equals', []);
});

Template.Personajes_admin.helpers({
    personajes(){
        let equals = [];

        if(Session.get('camp') === "nombre"){
            _.forEach(Img_personajes.find({}).fetch(), function (value,index) {
                if (value.nombre.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Img_personajes.find({_id: {$in: equals} }, {sort: {nombre: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        if(Session.get('camp') === "alt"){
            _.forEach(Img_personajes.find({}).fetch(), function (value,index) {
                if (value.alt.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Img_personajes.find({_id: {$in: equals} }, {sort: {alt: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "url"){
            _.forEach(Img_personajes.find({}).fetch(), function (value,index) {
                if (value.url_png.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Img_personajes.find({_id: {$in: equals}}, {sort: {url_png: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "date"){
            return Img_personajes.find({}, {sort: {date: -1}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
    }
});

Template.Personajes_admin.events({
    'click .borrar_personaje': function(e){
        e.preventDefault();

        Meteor.call('img_personaje.admin_remove', this._id, function (err, res) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo borrar');
            }
            else {
                Msj_modal.open_success("Se ha borrado correctamente");
            }
        });
    },
    'submit .form_personaje': function(e){
        e.preventDefault();

        let doc_personaje = this;
        doc_personaje.nombre = $('.nombre', e.target).val();
        doc_personaje.alt = $('.alt', e.target).val();
        doc_personaje.url_png = $('.url_png', e.target).val();
        doc_personaje.url_gif = $('.url_gif', e.target).val();
        doc_personaje.url_carrousel = $('.url_carrousel', e.target).val();

        Meteor.call('img_personaje.admin_update', doc_personaje, function (err, res) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});