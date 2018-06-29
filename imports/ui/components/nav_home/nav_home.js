import './nav_home.html';
import '/imports/ui/components/nav_audio/nav_audio.js';
import '/imports/ui/components/nav_solo_view/nav_solo_view.js';
import '/imports/ui/components/nav_usuario/nav_usuario.js';

import { Template } from 'meteor/templating';

Template.Nav_home.helpers({
    homeActive(){
        if(FlowRouter.getRouteName() === 'Route.home'){
            return 'active';
        }
    },
    foroActive(){
        if(FlowRouter.getRouteName() === 'Route.foro'){
            return 'active';
        }
    },
    rankingActive(){
        if(FlowRouter.getRouteName() === 'Route.ranking'){
            return 'active';
        }
    },
    videosActive() {
        if (FlowRouter.getRouteName() === 'Route.videos') {
            return 'active';
        }
    }
});