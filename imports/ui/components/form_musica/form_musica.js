import './form_musica.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Form_musica.events({
    'click #escucharCancion': function (e) {
        e.preventDefault();

        window.open($('#url_add_musica').val());
    },
    'submit #form_add_musica': function (e) {
        e.preventDefault();

        Meteor.call('musica.admin_insert', {nombre: $('#nombre_add_musica').val(), url: $('#url_add_musica').val()}, function(err, res){
            if(!err){
                Session.set('pageActual', 0);
                Session.set('camp', 'date');
                $("#search_input").val("");
                $('#nombre_add_musica').val("");
                $('#url_add_musica').val("");
            }
            else {
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
        });
    }
});