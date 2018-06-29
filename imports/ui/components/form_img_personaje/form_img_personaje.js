import './form_img_personaje.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Form_img_personaje.events({
    'click #verImagenPersonajePng': function (e) {
        e.preventDefault();

        window.open($('#url_png_add_personaje').val());
    },
    'click #verImagenPersonajeGif': function (e) {
        e.preventDefault();

        window.open($('#url_gif_add_personaje').val());
    },
    'click #verImagenPersonajeCarrousel': function (e) {
        e.preventDefault();

        window.open($('#url_carrousel_add_personaje').val());
    },
    'submit #form_img_personaje': function (e) {
        e.preventDefault();

        let docImg = {};

        docImg.nombre = $('#nombre_add_personaje').val();
        docImg.alt = $('#alt_add_personaje').val();
        docImg.url_png = $('#url_png_add_personaje').val();
        docImg.url_gif = $('#url_gif_add_personaje').val();
        docImg.url_carrousel = $('#url_carrousel_add_personaje').val();

        Meteor.call('img_personaje.admin_insert', docImg, function(err, res){
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Session.set('pageActual', 0);
                Session.set('camp', 'date');
                $("#search_input").val("");
                $('#nombre_add_personaje').val("");
                $('#alt_add_personaje').val("");
                $('#url_png_add_personaje').val("");
                $('#url_gif_add_personaje').val("");
                $('#url_carrousel_add_personaje').val("");
            }
        });
    }
});
