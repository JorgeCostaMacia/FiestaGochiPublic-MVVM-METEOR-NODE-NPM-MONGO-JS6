import './juego.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/personaje/personaje.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Partidas } from '/imports/api/partidas/partidas';
import {Juego} from "/imports/ui/components/juego/juego";

Template.Page_juego.onCreated(
    function(){
        Meteor.subscribe('img.personajes', function(){
            Session.set('imgPersonajes', 'ready');
        });
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('partidas', function(){
            Session.set('partidasSub', 'ready');
            if(Partidas.findOne().stats.energia >= 80){
                Meteor.subscribe('parametros.juego', function(){
                    $(document).on('keypress', function(e){
                        Juego.evalInput(e.charCode);
                    });

                    Juego.iniPartida();
                });
            }
        });
    }
);

Template.Page_juego.events({
    'click #arriba': function(){
        Juego.evalInput(119);
    },
    'click #derecha': function(){
        Juego.evalInput(100);
    },
    'click #abajo': function(){
        Juego.evalInput(115);
    },
    'click #izquierda': function(){
        Juego.evalInput(97);
    }
});