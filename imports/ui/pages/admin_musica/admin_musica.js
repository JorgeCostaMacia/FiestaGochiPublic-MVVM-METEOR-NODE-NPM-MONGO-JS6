import './admin_musica.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/form_musica/form_musica.js';
import '/imports/ui/components/order_admin_musica/order_admin_musica.js';
import '/imports/ui/components/buscador/buscador.js';
import '/imports/ui/components/musica_admin/musica_admin.js';
import '/imports/ui/components/pagination_admin_musica/pagination_admin_musica.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_admin_musica.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
    }
);
