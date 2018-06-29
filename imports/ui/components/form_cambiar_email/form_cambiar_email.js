import './form_cambiar_email.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "/imports/ui/components/msj_modal/msj_modal";

Template.Form_cambiar_email.events({
    'submit #formCambiarEmail': function (e) {
        e.preventDefault();

        Meteor.call('usuarios.cambiarEmail', $('#modEmail').val(),
            function (err) {
                if (err) {
                    if (err.reason === "Email already exists.") {
                        Msj_modal.open_danger("Ya existe un usuario con ese email");
                    }
                    else {
                        Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
                    }
                }
                else {
                    Msj_modal.open_success("Se va a cerrar su sesión. <br>Se ha enviado el email de confirmación, revise su bandeja para terminar el cambio de email");
                    Session.set('inputActive', '');
                    $('#modEmail').val('');
                }
            });
    }
});