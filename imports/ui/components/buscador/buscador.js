import './buscador.html';

import {Template} from "meteor/templating";

Template.Buscador.onCreated(function () {
    Session.set('textSearch', '');
});

Template.Buscador.events({
    'keyup #search_input': function(e){
        Session.set('textSearch', $('#search_input').val());
        Session.set('pageActual', 0);
    },
    'click .soloView': function (e) {
        e.preventDefault();
    }
});