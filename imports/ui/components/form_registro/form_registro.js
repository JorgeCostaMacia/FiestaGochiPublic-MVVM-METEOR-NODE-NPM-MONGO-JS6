import './form_registro.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import {Msj_modal} from "/imports/ui/components/msj_modal/msj_modal.js";

Template.Form_registro.events({
    'submit #register-form' : function (e) {
        e.preventDefault();

        if ($("#regPass").val() !== $("#regPassConf").val()) {
            Msj_modal.open_danger('No coinciden las contraseñas<br>');
        }
        else {
            Meteor.call('usuarios.registrar', {username: $("#regNick").val(), email: $("#regEmail").val(),password: $("#regPass").val()},
                function(err, result){
                    if(err){
                        if(err.reason === "Username already exists."){
                            Msj_modal.open_danger("Ya existe un usuario con ese nick<br>");
                        }
                        else if(err.reason === "Email already exists."){
                            Msj_modal.open_danger("Ya existe un usuario con ese email<br>");
                        }
                        else {
                            Msj_modal.open_danger("Se produjo un error durante el registro<br>");
                        }
                    }
                    else {
                        Msj_modal.open_success("Se ha enviado el email de confirmación, revise su bandeja para terminar el registro");
                        $('#regNick').val("");
                        $('#regEmail').val("");
                        $('#regPass').val("");
                        $('#regPassConf').val("");
                        $('#login-form-link').click();
                    }
                });
        }
    }
});