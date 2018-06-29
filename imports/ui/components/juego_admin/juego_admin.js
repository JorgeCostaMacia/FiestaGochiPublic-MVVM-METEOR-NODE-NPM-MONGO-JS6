import './juego_admin.html';

import {Parametros} from "../../../api/parametros/parametros.js";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Juego_admin.helpers({
    juego(){
        if(Session.get('parJuegoSub') === "ready" && Meteor.user()){
            return Parametros.findOne({_id: 'juego'});
        }
    },
    colorUno(){
        if(Session.get('parJuegoSub') === "ready" && Meteor.user()){
            return Parametros.findOne({_id: 'juego'}).color[0];
        }
        else {
            return "#FFFFFF";
        }
    },
    colorDos(){
        if(Session.get('parJuegoSub') === "ready" && Meteor.user()){
            return Parametros.findOne({_id: 'juego'}).color[1];
        }
        else {
            return "#FFFFFF";
        }
    },
    colorTres(){
        if(Session.get('parJuegoSub') === "ready" && Meteor.user()){
            return Parametros.findOne({_id: 'juego'}).color[2];
        }
        else {
            return "#FFFFFF";
        }
    },
    colorCuatro(){
        if(Session.get('parJuegoSub') === "ready" && Meteor.user()){
            return Parametros.findOne({_id: 'juego'}).color[3];
        }
        else {
            return "#FFFFFF";
        }
    }
});

Template.Juego_admin.events({
    'submit #form_juego': function (e) {
        e.preventDefault();

        let doc_juego = {};
        doc_juego.color = [$('#colorUno').val(), $('#colorDos').val(), $('#colorTres').val(), $('#colorCuatro').val()];
        doc_juego.interval = 1 * $('#interval').val();
        doc_juego.puntosAcierto = 1 * $('#puntosAcierto').val();
        doc_juego.puntosFallo = 1 * $('#puntosFallo').val();

        Meteor.call('parametros.admin_juego_update', doc_juego, function (err,ress) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});

