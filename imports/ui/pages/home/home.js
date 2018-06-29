import './home.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/status_bar_left/status_bar_left.js';
import '/imports/ui/components/status_bar_right/status_bar_right.js';
import '/imports/ui/components/personaje/personaje.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_home.onCreated(
    function(){
        Meteor.subscribe('partidas', function(){
            Session.set('partidasSub', 'ready');
        });
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
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
    }
);