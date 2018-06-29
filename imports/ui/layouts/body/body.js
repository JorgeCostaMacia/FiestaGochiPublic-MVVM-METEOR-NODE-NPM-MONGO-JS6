import './body.html';
import '/imports/ui/components/msj_modal/msj_modal.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Img_body} from "../../../api/img_body/img_body.js";

Template.Body.onCreated(function(){
    Session.set('imgBody', "cargando");

    Meteor.subscribe('img.body', function(){
        Session.set('imgBody', "ready");
    });
});

Template.Body.helpers({
    background(){
        if(Session.get('imgBody') === "ready"){
            $(document.body).css('background-image', 'url(' + Img_body.findOne({_id: 'background_home'}).url + ')');
        }
    }
});

Template.Body.events({
    'click .dropdown-toggle' : function (e) {
        $('.dropdown-toggle').dropdown('toggle');
    }
});
