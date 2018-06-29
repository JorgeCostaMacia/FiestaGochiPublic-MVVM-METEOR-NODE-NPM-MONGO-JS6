import './admin_par_juego.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/juego_admin/juego_admin.js';

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";

Template.Page_admin_parametros_juego.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('parametros.juego', function(){
            Session.set('parJuegoSub', 'ready');
        });
    }
);