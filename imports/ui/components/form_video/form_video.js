import './form_video.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Form_video.events({
    'click #verVideo': function (e) {
        e.preventDefault();

        window.open($('#url_add_video').val());
    },
    'submit #form_add_video': function (e) {
        e.preventDefault();

        Meteor.call('videos.admin_insert', {nombre: $('#nombre_add_video').val(), url: $('#url_add_video').val(), jugadores: 1 * $('#jug_add_video').val()}, function(err, res){
            if(!err){
                Session.set('pageActual', 0);
                Session.set('camp', 'date');
                $("#search_input").val("");
                $('#nombre_add_video').val("");
                $('#url_add_video').val("");
            }
            else {
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
        });
    }
});