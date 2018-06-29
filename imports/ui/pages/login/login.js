import './login.html';
import '/imports/ui/components/nav_login/nav_login.js';
import '/imports/ui/components/form_login/form_login.js';
import '/imports/ui/components/form_recuperar/form_recuperar.js';
import '/imports/ui/components/form_registro/form_registro.js';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.Page_login.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
    }
);

Template.Page_login.events({
    'click #login-form-link' : function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $("#recuperar-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $('#register-form').addClass('hidden');
        $('#recuperar-form').addClass('hidden');
        $('#login-form').removeClass('hidden');
        $('#login-form-link').addClass('active');    },
    'click #register-form-link' : function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $("#recuperar-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $('#login-form').addClass('hidden');
        $('#recuperar-form').addClass('hidden');
        $('#register-form').removeClass('hidden');
        $('#register-form-link').addClass('active');
    },
    'click #reco-form-link' : function (e) {
        $("#recuperar-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $("#register-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $('#register-form-link').removeClass('active');
        $('#login-form').addClass('hidden');
        $('#register-form').addClass('hidden');
        $('#recuperar-form').removeClass('hidden');
    }
});