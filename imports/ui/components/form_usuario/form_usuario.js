import './form_usuario.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Form_usuario.events({
    'submit #form_add_usuario': function (e) {
        e.preventDefault();

        Meteor.call('users.admin_insert', {username: $("#nick_add_usuario").val(), email: $("#email_add_usuario").val(),password: $("#pass_add_usuario").val()}, function(err, res){
            if(err){
                if(err.reason === "Username already exists."){
                    Msj_modal.open_danger("Ya existe un usuario con ese nick<br>");
                }
                else if(err.reason === "Email already exists."){
                    Msj_modal.open_danger("Ya existe un usuario con ese email<br>");
                }
                else {
                    Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
                }
            }
            else {
                Session.set('camp', 'creacion');
                Session.set('order', -1);
                $("#search_input").val("");
                $("#nick_add_usuario").val("");
                $("#email_add_usuario").val("");
                $("#pass_add_usuario").val("");
            }
        });
    }
});