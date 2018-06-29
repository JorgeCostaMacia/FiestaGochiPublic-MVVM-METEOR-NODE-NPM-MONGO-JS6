import './videos.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/select_videos/select_videos.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_videos.onCreated(
    function(){
        Meteor.subscribe('videos.jug1', function(){
            Session.set('videos1Sub', "ready");
        });
        Meteor.subscribe('videos.jug2',function(){
            Session.set('videos2Sub', "ready");
        });
        Meteor.subscribe('videos.jug3', function(){
            Session.set('videos3Sub', "ready");
        });
        Meteor.subscribe('videos.jug4', function(){
            Session.set('videos4Sub', "ready");
        });
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
    }
);

Template.Page_videos.helpers({
    urlVideo(){
        return Session.get('urlVideo');
    }
});
