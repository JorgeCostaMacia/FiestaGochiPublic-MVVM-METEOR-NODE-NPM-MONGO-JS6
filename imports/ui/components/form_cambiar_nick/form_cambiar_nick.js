import './form_cambiar_nick.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "/imports/ui/components/msj_modal/msj_modal";

Template.Form_cambiar_nick.events({
    'submit #formCambiarNick' : function (e) {
        e.preventDefault();

        Meteor.call('usuarios.cambiarNick', $('#modNick').val(),
            function (err) {
                if(err) {
                    if (err.reason === "Username already exists.") {
                        Msj_modal.open_danger("Ya existe un usuario con ese nick");
                    }
                    else {
                        Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
                    }
                }
                else{
                    Msj_modal.open_success("Se ha modificado correctamente");
                    Session.set('inputActive', '');
                    $('#modNick').val('');
                }
            });
    }
});