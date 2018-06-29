import './form_login.html'

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import {Msj_modal} from "/imports/ui/components/msj_modal/msj_modal.js";

Template.Form_login.events({
    'submit #login-form' : function (e) {
        e.preventDefault();

        Meteor.loginWithPassword($('#logEmail').val(), $('#logPass').val(),
            function(err){
                if(err) {
                    if (err.reason === "Error, too many requests. Please slow down. You must wait 8 seconds before trying again.") {
                        Msj_modal.open_danger("Ha intentado acceder demasiadas veces, espere 10 segundos");
                    }
                    else {
                        Msj_modal.open_danger("No coinciden los datos introducidos con ningún usuario registrado");
                    }
                }
            });
    }
});