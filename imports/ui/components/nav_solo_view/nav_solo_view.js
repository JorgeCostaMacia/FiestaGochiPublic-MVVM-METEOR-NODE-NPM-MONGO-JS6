import './nav_solo_view.html';

import {Template} from "meteor/templating";

Template.Nav_solo_view.helpers({
    miCuentaActive(){
        return FlowRouter.getRouteName() === 'Route.mi_cuenta';
    },
    juegoActive(){
        return FlowRouter.getRouteName() === 'Route.juego';
    },
    cuentasActive(){
        return FlowRouter.getRouteName() === 'Route.admin_cuentas';
    },
    imagenesActive(){
        return FlowRouter.getRouteName() === 'Route.admin_imagenes';
    },
    personajesActive(){
        return FlowRouter.getRouteName() === 'Route.admin_personajes';
    },
    musicaActive(){
        return FlowRouter.getRouteName() === 'Route.admin_musica';
    },
    videosActive(){
        return FlowRouter.getRouteName() === 'Route.admin_videos';
    },
    parCronActive(){
        return FlowRouter.getRouteName() === 'Route.admin_parametros_cron';
    },
    parPartidaActive(){
        return FlowRouter.getRouteName() === 'Route.admin_parametros_partida';
    },
    parJuegoActive(){
        return FlowRouter.getRouteName() === 'Route.admin_parametros_juego';
    }
});

Template.Nav_solo_view.events({
    'click .soloView': function (e) {
        e.preventDefault();
    }
});