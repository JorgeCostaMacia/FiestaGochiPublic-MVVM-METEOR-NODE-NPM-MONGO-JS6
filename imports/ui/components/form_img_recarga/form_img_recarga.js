import './form_img_recarga.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Img_recompensas} from "../../../api/img_recompensas/img_recompensas";

Template.Form_img_recarga.helpers({
    imagenRecarga(){
        if(Session.get('imgRecoSub') === "ready"){
            return Img_recompensas.findOne({_id: 'recarga'});
        }
    }
});

Template.Form_img_recarga.events({
    'click #verImagenRecarga': function (e) {
        e.preventDefault();

        window.open($('#url_mod_img_recarga').val());
    },
    'submit #form_img_recarga': function (e) {
        e.preventDefault();

        let docImg = {};

        docImg.nombre = $('#nombre_mod_img_recarga').val();
        docImg.alt = $('#alt_mod_img_recarga').val();
        docImg.url = $('#url_mod_img_recarga').val();

        Meteor.call('img_recarga.admin_update', docImg, function(err, res){
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});