import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { Partidas } from '/imports/api/partidas/partidas.js';
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../../ui/components/msj_modal/msj_modal";
import moment from 'moment';

Accounts.onLogin(function(){
    if(Meteor.user().emails[0].verified){
        if(FlowRouter.getRouteName() === "Route.login"){
            FlowRouter.go('/');
            Accounts.logoutOtherClients();
        }
    }
    else {
        Meteor.logout();
        Msj_modal.open_danger("Aun no ha verificado su email, porfavor revise su bandeja de entrada");
    }
});

Accounts.onLogout(function(){
    FlowRouter.go('/login');
});

Accounts.onEmailVerificationLink(function (token, result) {
    Accounts.verifyEmail(token, function (err, ress) {
        if(!err){
            Msj_modal.open_success("Se ha verificado correctamente, ya puede iniciar sesión <br> Se ha mandado un email con las instrucciones, revise su bandeja");

            Meteor.call('email.bienvenido');
            Meteor.logout();
        }
    });
});

FlowRouter.triggers.exit([function(context, redirect){
    if(Meteor.user()){
        let doc = {};
        doc.action = "exit";
        doc.route_name = FlowRouter.getRouteName();
        doc.date = moment().format('YYYY-MM-DD, HH:mm:ss');
        doc.geolocation = Geolocation.latLng();

        Meteor.call('log_users.insert', doc);
    }
}]);

FlowRouter.triggers.enter([function(context, redirect){
    $(document).off('keypress');

    Session.set('partidasSub', "cargando");
    Session.set('musicaSub', 'cargando');
    Session.set('usuariosSub', 'cargando');
    Session.set('imgRecoSub', 'cargando');
    Session.set('imgConsuSub', 'cargando');
    Session.set('imgPersonajes', 'cargando');
    Session.set('imgBody', "cargando");
    Session.set('cronSub', 'cargando');
    Session.set('parJuegoSub', 'cargando');
    Session.set('parPartidaSub', 'cargando');
    Session.set('videos1Sub', "cargando");
    Session.set('videos2Sub', "cargando");
    Session.set('videos3Sub', "cargando");
    Session.set('videos4Sub', "cargando");
    Session.set('foroSub', 'cargando');
    Session.set('rankingsSub', 'cargando');

    Meteor.setTimeout(function(){
        if(Meteor.user()){
            let doc = {};
            doc.action = "enter";
            doc.route_name = FlowRouter.getRouteName();
            doc.date = moment().format('YYYY-MM-DD, HH:mm:ss');
            doc.geolocation = Geolocation.latLng();

            Meteor.call('log_users.insert', doc);
        }

        if(!Meteor.user()){
            FlowRouter.go('/login');
        }
        else if(Meteor.user().emails[0].verified === false){
            Meteor.logout();
        }
        else if(FlowRouter.getRouteName() === 'Route.juego'){
            if(Partidas.findOne({_id: Meteor.userId()}).stats.energia < 80){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_cuentas'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_imagenes'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_personajes'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_musica'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_videos'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_parametros_juego'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_parametros_partida'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
        else if(FlowRouter.getRouteName() === 'Route.admin_parametros_cron'){
            if(Meteor.user().profile.roles !== "admin"){
                FlowRouter.go('/');
            }
        }
    }, 500);
}]);

FlowRouter.notFound = {
    action() {
        FlowRouter.go('/');
    }
};