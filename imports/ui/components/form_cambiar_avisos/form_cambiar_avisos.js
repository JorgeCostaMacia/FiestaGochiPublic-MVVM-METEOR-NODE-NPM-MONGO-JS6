import './form_cambiar_avisos.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Form_cambiar_avisos.events({
    'submit #formCambiarAvisos': function (e) {
        e.preventDefault();

        Meteor.call('usuarios.cambiarAvisos', $('#modAvisos').val(), function (err, ress) {
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