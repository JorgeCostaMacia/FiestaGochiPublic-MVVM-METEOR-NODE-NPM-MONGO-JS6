import './form_cambiar_password.html';

import {Template} from "meteor/templating";
import {Msj_modal} from "/imports/ui/components/msj_modal/msj_modal";
import {Accounts} from "meteor/accounts-base";

Template.Form_cambiar_password.events({
    'submit #formCambiarPass' : function (e) {
        e.preventDefault();

        if ($("#modPass").val() !== $("#modPassConf").val()) {
            Msj_modal.open_danger("No coinciden las contraseñas");
        }
        else{
            Accounts.changePassword($("#modPassActual").val(), $("#modPass").val(),
                function(err){
                    if(err){
                        Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
                    }
                    else{
                        Msj_modal.open_success("Se ha modificado correctamente");
                        Session.set('inputActive', '');
                        $("#modPassActual").val('');
                        $("#modPass").val('');
                        $("#modPassConf").val('');
                    }
                });
        }
    }
});