import './form_img_body_admin.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Img_body} from "../../../api/img_body/img_body";

Template.Form_img_body_admin.helpers({
    imagenBody(){
        if(Session.get('imgBody') === "ready"){
            return Img_body.findOne();
        }
    }
});

Template.Form_img_body_admin.events({
   'click #verImagenBody': function (e) {
       e.preventDefault();

       window.open($('#url_mod_img_body').val());
   },
    'submit #form_img_body': function (e) {
        e.preventDefault();

        let docImg = {};

        docImg.nombre = $('#nombre_mod_img_body').val();
        docImg.alt = $('#alt_mod_img_body').val();
        docImg.url = $('#url_mod_img_body').val();

        Meteor.call('img_body.admin_update', docImg, function(err, res){
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});