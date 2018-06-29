import {Meteor} from "meteor/meteor";
import {Videos} from "../../../api/videos/videos";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import {EmailTemplates} from "../../../ui/components/email_body/email_body";
import {Email} from "meteor/email";
import moment from 'moment';

Meteor.startup(() => {
    if(Videos.find({jugadores: 1}).count() === 0){
        let errDoc = null;
        try{
            Videos.insert({
                nombre: "It's Raining Men",
                url: "https://www.youtube-nocookie.com/embed/7St0NnVMN4Y?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Toxic",
                url: "https://www.youtube-nocookie.com/embed/pzpO36EyDA8?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "S.O.S",
                url: "https://www.youtube-nocookie.com/embed/GXpxltpRzqY?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Dagomba",
                url: "https://www.youtube-nocookie.com/embed/GRAqn78FkJo?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Move Your Feet",
                url: "https://www.youtube-nocookie.com/embed/ycc6Ge0lVPo?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "I Want You Back",
                url: "https://www.youtube-nocookie.com/embed/06jv6CyGPL0?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Holiday",
                url: "https://www.youtube-nocookie.com/embed/5cVQDqEqiAs?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Satisfaction",
                url: "https://www.youtube-nocookie.com/embed/d_Iq5NuB430?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Crazy in Love",
                url: "https://www.youtube-nocookie.com/embed/GSXx2qi1aAE?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "The Power",
                url: "https://www.youtube-nocookie.com/embed/yMXqWITRAh8?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 1,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            errDoc = {
                api: 'videos 1',
                action: 'insert ini server',
                date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                error: err
            };

            errDoc._id = Log_api_error.insert(errDoc);

            Email.send({
                to: 'suportfiestagochi@gmail.com',
                from: 'FiestaGochi <fiestagochi@gmail.com>',
                subject: 'Error ' + errDoc._id,
                html: EmailTemplates.errorBody(errDoc)
            });

            throw err;
        }
    }
    if(Videos.find({jugadores: 2}).count() === 0) {
        try{
            Videos.insert({
                nombre: "Girlfriend",
                url: "https://www.youtube-nocookie.com/embed/rkNHlJSGcv4?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Hot Stuff",
                url: "https://www.youtube-nocookie.com/embed/C7fYcYlOklk?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Jump",
                url: "https://www.youtube-nocookie.com/embed/H8mxgMuTrz4?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Promiscuous",
                url: "https://www.youtube-nocookie.com/embed/KFA_jdR_ivI?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "No Limit",
                url: "https://www.youtube-nocookie.com/embed/ihw5NPCW2Lg?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Da Funk",
                url: "https://www.youtube-nocookie.com/embed/QsMk9m2QScM?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Beautiful Liar",
                url: "https://www.youtube-nocookie.com/embed/eMvnMMeZiRA?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Mamasita",
                url: "https://www.youtube-nocookie.com/embed/5nZqG794Zag?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Run The Show",
                url: "https://www.youtube-nocookie.com/embed/uoFVc3WFAAM?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Tribal Dance",
                url: "https://www.youtube-nocookie.com/embed/0hZcNcWARFE?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 2,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            errDoc = {
                api: 'videos 2',
                action: 'insert ini server',
                date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                error: err
            };

            errDoc._id = Log_api_error.insert(errDoc);

            Email.send({
                to: 'suportfiestagochi@gmail.com',
                from: 'FiestaGochi <fiestagochi@gmail.com>',
                subject: 'Error ' + errDoc._id,
                html: EmailTemplates.errorBody(errDoc)
            });
            throw err;
        }
    }
    if(Videos.find({jugadores: 3}).count() === 0) {
        try{
            Videos.insert({
                nombre: "Dark Horse",
                url: "https://www.youtube-nocookie.com/embed/vNb1PXWQHbo?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "The Fox",
                url: "https://www.youtube-nocookie.com/embed/Gk6kM-hbliA?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Bad Romance",
                url: "https://www.youtube-nocookie.com/embed/Dd8OqrsDXjM?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "It's My Birthday",
                url: "https://www.youtube-nocookie.com/embed/S9qTfvp8YGE?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Born This Way",
                url: "https://www.youtube-nocookie.com/embed/AerpamdCtmc?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Fancy",
                url: "https://www.youtube-nocookie.com/embed/rH_btiMulXE?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Hey Mama",
                url: "https://www.youtube-nocookie.com/embed/OGkxJ9046Lk?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Boys",
                url: "https://www.youtube-nocookie.com/embed/lhra6pS_PCQ?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Get Ugly",
                url: "https://www.youtube-nocookie.com/embed/dnPd2WuD3wc?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "DADDY",
                url: "https://www.youtube-nocookie.com/embed/7ox_vevjVyM?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 3,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            errDoc = {
                api: 'videos 3',
                action: 'insert ini server',
                date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                error: err
            };

            errDoc._id = Log_api_error.insert(errDoc);

            Email.send({
                to: 'suportfiestagochi@gmail.com',
                from: 'FiestaGochi <fiestagochi@gmail.com>',
                subject: 'Error ' + errDoc._id,
                html: EmailTemplates.errorBody(errDoc)
            });

            throw err;
        }
    }
    if(Videos.find({jugadores: 4}).count() === 0) {
        try{
            Videos.insert({
                nombre: "Dynamite",
                url: "https://www.youtube-nocookie.com/embed/_RDbGaQ-1qM?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "The Fox",
                url: "https://www.youtube-nocookie.com/embed/Gk6kM-hbliA?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "I Was Made For Lovin' You",
                url: "https://www.youtube-nocookie.com/embed/CpNK7zZPEAw?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Jailhouse Rock",
                url: "https://www.youtube-nocookie.com/embed/Al1Jfx3RcEA?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "What Makes You Beautiful",
                url: "https://www.youtube-nocookie.com/embed/pvzVBG6PxLs?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Wild Wild West",
                url: "https://www.youtube-nocookie.com/embed/4jcQkw3hqJQ?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Pound The Alarm",
                url: "https://www.youtube-nocookie.com/embed/B1ha2xLOpJQ?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Kiss You",
                url: "https://www.youtube-nocookie.com/embed/PgMx6jr7RjY?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "You're On My Mind",
                url: "https://www.youtube-nocookie.com/embed/olv9jsDqsAY?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
            Videos.insert({
                nombre: "Bang Bang",
                url: "https://www.youtube-nocookie.com/embed/JSFZ1JIbZec?autoplay=1&loop=1&rel=0&amp;showinfo=0",
                jugadores: 4,
                date: moment().format('YYYY-MM-DD, HH:mm:ss')
            });
        }
        catch (err) {
            errDoc = {
                api: 'videos 4',
                action: 'insert ini server',
                date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                error: err
            };

            errDoc._id = Log_api_error.insert(errDoc);

            Email.send({
                to: 'suportfiestagochi@gmail.com',
                from: 'FiestaGochi <fiestagochi@gmail.com>',
                subject: 'Error ' + errDoc._id,
                html: EmailTemplates.errorBody(errDoc)
            });

            throw err;
        }
    }
});