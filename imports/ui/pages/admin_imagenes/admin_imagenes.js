import './admin_imagenes.html';
import '/imports/ui/components/nav_home/nav_home';
import '/imports/ui/components/form_img_body_admin/form_img_body_admin';
import '/imports/ui/components/form_img_gyn/form_img_gyn.js';
import '/imports/ui/components/form_img_bizcocho/form_img_bizcocho';
import '/imports/ui/components/form_img_caramelo/form_img_caramelo';
import '/imports/ui/components/form_img_daleGas/form_img_daleGas';
import '/imports/ui/components/form_img_recarga/form_img_recarga';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_admin_imagenes.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('partidas', function(){
            Session.set('partidasSub', 'ready');
        });
        Meteor.subscribe('img.consumibles', function(){
            Session.set('imgConsuSub', 'ready');
        });
        Meteor.subscribe('img.recompensas', function(){
            Session.set('imgRecoSub', 'ready');
        });
        Meteor.subscribe('img.personajes', function(){
            Session.set('imgPersonajes', 'ready');
        });
        Meteor.subscribe('img.body', function(){
            Session.set('imgBody', "ready");
        })
    }
);