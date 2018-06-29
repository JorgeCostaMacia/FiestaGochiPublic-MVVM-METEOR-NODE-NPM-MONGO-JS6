import './admin_par_cron.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/cron_admin/cron_admin.js';

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";

Template.Page_admin_parametros_cron.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('parametros.cron', function(){
            Session.set('cronSub', 'ready');
        });
    }
);