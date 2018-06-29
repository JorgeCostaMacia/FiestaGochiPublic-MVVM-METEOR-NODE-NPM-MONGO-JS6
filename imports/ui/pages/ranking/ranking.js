import './ranking.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/order_ranking/order_ranking.js';
import '/imports/ui/components/pagination_ranking/pagination_ranking.js';
import '/imports/ui/components/puntuacion_ranking/puntuacion_ranking.js';
import '/imports/ui/components/buscador/buscador.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_ranking.onCreated(
    function(){
        Meteor.subscribe('rankings', function(){
            Session.set('rankingsSub', 'ready');
        });
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
    }
);

