import './form_img_bizcocho.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Img_consumibles} from "../../../api/img_consumibles/img_consumibles";

Template.Form_img_bizcocho.helpers({
    imagenBizcocho(){
        if(Session.get('imgConsuSub') === "ready"){
            return Img_consumibles.findOne({_id: 'bizcocho'});
        }
    }
});

Template.Form_img_bizcocho.events({
    'click #verImagenBizcocho': function (e) {
        e.preventDefault();

        window.open($('#url_mod_img_bizcocho').val());
    },
    'submit #form_img_bizcocho': function (e) {
        e.preventDefault();

        let docImg = {};

        docImg.nombre = $('#nombre_mod_img_bizcocho').val();
        docImg.alt = $('#alt_mod_img_bizcocho').val();
        docImg.url = $('#url_mod_img_bizcocho').val();

        Meteor.call('img_bizcocho.admin_update', docImg, function(err, res){
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});