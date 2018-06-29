import './admin_videos.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/form_video/form_video.js';
import '/imports/ui/components/order_admin_videos/order_admin_videos.js';
import '/imports/ui/components/buscador/buscador.js';
import '/imports/ui/components/videos_admin/videos_admin.js';
import '/imports/ui/components/pagination_admin_videos/pagination_admin_videos.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_admin_videos.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('videos.admin_jug1', function(){
            Session.set('videos1Sub', "ready");
        });
        Meteor.subscribe('videos.admin_jug2',function(){
            Session.set('videos2Sub', "ready");
        });
        Meteor.subscribe('videos.admin_jug3', function(){
            Session.set('videos3Sub', "ready");
        });
        Meteor.subscribe('videos.admin_jug4', function(){
            Session.set('videos4Sub', "ready");
        });
    }
);