import { Meteor } from 'meteor/meteor';

Meteor.publish('usuarios.admin', function () {
    if(Meteor.user() && Meteor.user().profile.roles === "admin"){
        return Meteor.users.find({'profile.roles': 'user'}, {fields: {username: 1, profile: 1, emails: 1, createdAt: 1}});
    }
});