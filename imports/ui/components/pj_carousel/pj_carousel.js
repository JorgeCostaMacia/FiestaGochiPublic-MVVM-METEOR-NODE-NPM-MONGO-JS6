import './pj_carousel.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Img_personajes} from "../../../api/img_personajes/img_personajes";

const carousel_active = {status: true};

Template.Pj_carousel.onCreated(function(){
    carousel_active.status = true;
});

Template.Pj_carousel.helpers({
    pjs_carrousel(){
        if(Session.get('imgPersonajes') === 'ready'){
            return Img_personajes.find();
        }
    },
    carousel_active(){
        if(Session.get('imgPersonajes') === 'ready' && carousel_active.status){
            carousel_active.status = false;
            return 'active';
        }
    }
});

Template.Pj_carousel.events({
    'click .personaje_select':function(e){
        e.preventDefault();
        Meteor.call('partidas.cambiarPj', this._id, function (err, ress) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
            Session.set('inputActive', '');
        });

    }
});