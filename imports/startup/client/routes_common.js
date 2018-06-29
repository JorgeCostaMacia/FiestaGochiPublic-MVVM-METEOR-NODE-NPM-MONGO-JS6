import '/imports/ui/layouts/body/body.js';

import '/imports/ui/pages/login/login.js';
import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/mi_cuenta/mi_cuenta.js';
import '/imports/ui/pages/foro/foro.js';
import '/imports/ui/pages/juego/juego.js';
import '/imports/ui/pages/ranking/ranking.js';
import '/imports/ui/pages/videos/videos.js';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
    name: 'Route.home',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_home'
        });
    },
});
FlowRouter.route('/login', {
    name: 'Route.login',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_login'
        });
    },
});
FlowRouter.route('/mi_cuenta', {
    name: 'Route.mi_cuenta',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_mi_cuenta'
        });
    },
});
FlowRouter.route('/foro', {
    name: 'Route.foro',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_foro'
        });
    },
});
FlowRouter.route('/juego', {
    name: 'Route.juego',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_juego'
        });
    },
});
FlowRouter.route('/ranking', {
    name: 'Route.ranking',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_ranking'
        });
    },
});
FlowRouter.route('/videos', {
    name: 'Route.videos',
    action() {
        BlazeLayout.render('Body', {
            main: 'Page_videos'
        });
    },
});