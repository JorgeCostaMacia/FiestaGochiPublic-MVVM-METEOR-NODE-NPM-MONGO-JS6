import './form_recuperar.html'

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import {Msj_modal} from "/imports/ui/components/msj_modal/msj_modal.js";

Template.Form_recuperar.events({
    'submit #recuperar-form': function (e) {
        e.preventDefault();

        Meteor.call('usuarios.recuperar', {email: $("#recoEmail").val()},
            function (err) {
                if (err) {
                    if(err.error === "registrado"){
                        Msj_modal.open_danger("El email introducido no se encuentra registrado");
                    }
                    else if(err.error === "verificado"){
                        Msj_modal.open_danger("El email introducido no ha sido verificado");
                    }
                    else {
                        Msj_modal.open_danger("Se produjo un error durante la recuperación");
                    }
                }
                else {
                    Msj_modal.open_success("El email para la recuperación de contraseña ha sido enviado, revise su bandeja de entrada");
                }
            });
    },
});