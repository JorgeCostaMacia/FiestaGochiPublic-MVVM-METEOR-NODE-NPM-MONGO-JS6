import './admin_personajes.html';
import '/imports/ui/components/nav_home/nav_home';
import '/imports/ui/components/form_img_personaje/form_img_personaje';
import '/imports/ui/components/order_admin_personajes/order_admin_personajes';
import '/imports/ui/components/buscador/buscador.js';
import '/imports/ui/components/personajes_admin/personajes_admin.js';
import '/imports/ui/components/pagination_admin_personajes/pagination_admin_personajes.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_admin_personajes.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('img.personajes', function(){
            Session.set('imgPersonajes', 'ready');
        });
    }
);