import './foro.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/form_foro/form_foro.js';
import '/imports/ui/components/msj_foro/msj_foro.js';
import '/imports/ui/components/order_foro/order_foro';
import '/imports/ui/components/buscador/buscador.js';
import '/imports/ui/components/pagination_foro/pagination_foro.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_foro.onCreated(
    function(){
        Meteor.subscribe('foro', function(){
            Session.set('foroSub', 'ready');
        });
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
    }
);

