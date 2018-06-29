import './nav_audio.html';

import { Template } from 'meteor/templating';
import { Musica } from '/imports/api/musica/musica.js';

const audio = new Audio();
audio.src = "";

Template.Nav_audio.onCreated(function(){
    if(!Session.get('canalActual')){
        Session.set('canalActual', 'Ninguno');
    }
    if(!Session.get('audioStatus')){
        Session.set('audioStatus', 'play');
    }
});

Template.Nav_audio.helpers({
    canales(){
        return Musica.find();
    },
    audioStatus(){
        return Session.get('audioStatus');
    },
    canalActual(){
        return Session.get('canalActual');
    }
});

Template.Nav_audio.events({
    'click #playPause': function(e){
        e.preventDefault();
        if(audio.src !== ""){
            if(audio.paused) {
                audio.play();
                Session.set('audioStatus', 'pause');
            }
            else{
                audio.pause();
                Session.set('audioStatus', 'play');
            }
        }
    },
    'click .canales': function(e){
        e.preventDefault();

        if(!audio.paused) {
            audio.pause();
        }
        audio.src = this.url;
        audio.play();

        Session.set('canalActual',this.nombre);
        Session.set('audioStatus', 'pause');
    }
});