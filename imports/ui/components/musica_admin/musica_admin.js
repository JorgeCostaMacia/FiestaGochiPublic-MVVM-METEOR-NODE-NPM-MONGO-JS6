import './musica_admin.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Musica} from "../../../api/musica/musica.js";

Template.Musica_admin.onCreated(function () {
    Session.set('equals', []);
});

Template.Musica_admin.helpers({
    canciones(){
        let equals = [];

        if(Session.get('camp') === "nombre"){
            _.forEach(Musica.find({}).fetch(), function (value,index) {
                if (value.nombre.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Musica.find({_id: {$in: equals} }, {sort: {nombre: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "url"){
            _.forEach(Musica.find({}).fetch(), function (value,index) {
                if (value.url.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });
            Session.set('equals', equals);

            return Musica.find({_id: {$in: equals}}, {sort: {url: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "date"){
            return Musica.find({}, {sort: {date: -1}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
    }
});

Template.Musica_admin.events({
    'click .borrar_cancion': function(e){
        e.preventDefault();

        Meteor.call('musica.admin_remove', this._id,function (err, ress) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo borrar');
            }
            else {
                Msj_modal.open_success("Se ha borrado correctamente");
            }
        });
    },
    'submit .form_cancion': function(e){
        e.preventDefault();

        let doc_cancion = this;

        doc_cancion.nombre = $('.nombre', e.target).val();
        doc_cancion.url = $('.url', e.target).val();

        Meteor.call('musica.admin_update', doc_cancion,function (err, res) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});