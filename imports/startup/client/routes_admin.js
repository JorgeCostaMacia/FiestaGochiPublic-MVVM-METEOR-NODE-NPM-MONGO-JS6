import '/imports/ui/pages/admin_cuentas/admin_cuentas.js';
import '/imports/ui/pages/admin_imagenes/admin_imagenes.js';
import '/imports/ui/pages/admin_personajes/admin_personajes.js';
import '/imports/ui/pages/admin_musica/admin_musica.js';
import '/imports/ui/pages/admin_videos/admin_videos.js';
import '/imports/ui/pages/admin_par_cron/admin_par_cron.js';
import '/imports/ui/pages/admin_par_juego/admin_par_juego.js';
import '/imports/ui/pages/admin_par_partida/admin_par_partida.js';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/admin_cuentas', {
    name: 'Route.admin_cuentas',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_cuentas'
        });
    },
});
FlowRouter.route('/admin_imagenes', {
    name: 'Route.admin_imagenes',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_imagenes'
        });
    },
});
FlowRouter.route('/admin_personajes', {
    name: 'Route.admin_personajes',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_personajes'
        });
    },
});
FlowRouter.route('/admin_musica', {
    name: 'Route.admin_musica',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_musica'
        });
    },
});
FlowRouter.route('/admin_videos', {
    name: 'Route.admin_videos',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_videos'
        });
    },
});
FlowRouter.route('/admin_parametros_juego', {
    name: 'Route.admin_parametros_juego',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_parametros_juego'
        });
    },
});
FlowRouter.route('/admin_parametros_partida', {
    name: 'Route.admin_parametros_partida',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_parametros_partida'
        });
    },
});
FlowRouter.route('/admin_parametros_cron', {
    name: 'Route.admin_parametros_cron',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_admin_parametros_cron'
        });
    },
});