import './form_foro.html';

import { Meteor } from 'meteor/meteor';
import {Template} from "meteor/templating";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Form_foro.events({
    'submit #form_foro': function(e){
        e.preventDefault();

        Meteor.call('foro.insert', $('#input_foro').val(), function (err, ress) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Session.set('order', -1);
                Session.set('camp', 'date');
                Session.set('textSearch', "");
                $("#search_input").val("");
            }
        });
    }
});
