import './select_videos.html';

import {Template} from "meteor/templating";
import { Videos } from '/imports/api/videos/videos.js';

Template.Select_videos.onCreated(function(){
    Session.set('urlVideo', '')
});

Template.Select_videos.helpers({
    jug1(){
        return Videos.find({jugadores: 1});
    },
    jug2(){
        return Videos.find({jugadores: 2});
    },
    jug3(){
        return Videos.find({jugadores: 3});
    },
    jug4(){
        return Videos.find({jugadores: 4});
    }
});

Template.Select_videos.events({
    'click .videos_li': function(e){
        e.preventDefault();
        Session.set('urlVideo', this.url)
    }
});