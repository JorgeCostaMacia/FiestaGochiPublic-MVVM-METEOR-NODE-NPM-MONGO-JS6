import './admin_par_partida.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/partida_admin/partida_admin.js';

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";

Template.Page_admin_parametros_partida.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('parametros.partida', function(){
            Session.set('parPartidaSub', 'ready');
        });
    }
);