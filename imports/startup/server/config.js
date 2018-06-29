import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import moment from 'moment';
import 'moment/locale/es';
import 'moment-timezone';

Meteor.startup(() => {
    moment.tz.setDefault('Europe/Madrid');
    moment.locale('es');

    process.env.MAIL_URL = "smtps://fiestagochi%40gmail.com:***********@smtp.gmail.com:465/";
    Accounts.emailTemplates.siteName = "FiestaGochi";
    Accounts.emailTemplates.from = "FiestaGochi <fiestagochi@gmail.com>";

    Accounts.emailTemplates.verifyEmail = {
      subject(){
          return "Verificación de email";
      },
      text(user, url){
          return `${user.username} \n\n Haz click en el enlace para termiar el registro y que empieze la fiesta \n\n ${url}`;
      }
    };

    Accounts.emailTemplates.resetPassword = {
        subject(){
            return "Recuperación de contraseña";
        },
        text(user, url){
            return `${user.username} \n\n Parece que no te acuerdas de lo que hiciste ayer.... \n\n Haz click en el enlace para recuperar tu contraseña \n\n ${url}`;
        }
    };

    Accounts.config({
        loginExpirationInDays: 0.5,
        forbidClientAccountCreation : true
    });
});