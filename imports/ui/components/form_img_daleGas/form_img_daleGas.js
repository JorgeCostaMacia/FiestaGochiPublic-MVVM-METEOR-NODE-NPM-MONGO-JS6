import './form_img_daleGas.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Img_recompensas} from "../../../api/img_recompensas/img_recompensas";

Template.Form_img_daleGas.helpers({
    imagenDaleGas(){
        if(Session.get('imgRecoSub') === "ready"){
            return Img_recompensas.findOne({_id: 'daleGas'});
        }
    }
});

Template.Form_img_daleGas.events({
    'click #verImagenDaleGas': function (e) {
        e.preventDefault();

        window.open($('#url_mod_img_daleGas').val());
    },
    'submit #form_img_daleGas': function (e) {
        e.preventDefault();

        let docImg = {};

        docImg.nombre = $('#nombre_mod_img_daleGas').val();
        docImg.alt = $('#alt_mod_img_daleGas').val();
        docImg.url = $('#url_mod_img_daleGas').val();

        Meteor.call('img_daleGas.admin_update', docImg, function(err, res){
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});