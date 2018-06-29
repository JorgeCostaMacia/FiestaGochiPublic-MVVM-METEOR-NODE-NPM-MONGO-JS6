export const EmailTemplates = {
    bienvenido: function(){
        return  '<body style="width: 100%; margin: auto; text-align: center; font-family: \'Comic Sans MS\'">' +
            '<div style="width:100%; text-align: right;">' +
            '<a href="#"><h1><strong>FiestaGochi</strong></h1></a>' +
            '</div>' +
            '<div style="width: 100%">' +
            '<h1>Bienvenido a FiestaGochi!</h1>' +
            '<h3>Comienzas tu partida con:</h3>' +
            '<p>10 Gyn tonics, 10 Mufins de la risa y 10 Caramelos energeticos</p>' +
            '<p>Ademas cuentas con una recarga</p>' +
            '<br>' +
            '<p>Las reglas son sencillas, intenta aguantar hasta el final sin que el bajón pueda contigo</p>' +
            '<br>' +
            '<h3>Color de las barras y lo que representan:</h3>' +
            '<p>La barra roja representa tu estado general, que variaría en función de tu sed, alegría y cansancio</p>' +
            '<p>La barra azul representa tu sed</p>' +
            '<p>La barra verde representa tu alegría</p>' +
            '<p>La barra naranja representa tu cansancio</p>' +
            '<br>' +
            '<h3>Dinámica del juego:</h3>' +
            '<p>Cada hora los stats serán actualizados</p>' +
            '<p>Cada 2 horas recibirás una recarga</p>' +
            '<br>' +
            '<p>Para poder jugar necesitas tener tu energía al 80% o mas</p>' +
            '<p>Al jugar una partida tu energía bajara al 80%, tu sed, alegría y cansancio bajaran un 30%</p>' +
            '<br>' +
            '<p>El juego consiste en acertar la flecha iluminada, podrás jugar con A S D W - J K L I - Haciendo click sobre la flecha</p>' +            '<p>Si aciertas se te suman 500 puntos, si fallas se restan 100</p>' +
            '<p>Solamente puedes acertar 1 vez por vez, el resto cuentan como fallo</p>' +
            '<p>La velocidad dependerá del nivel en el que te encuentres</p>' +
            '<br>' +
            '<p>Por cada nivel que consigas obtendrás un juego extra que podrás encontrar en el apartado de videos</p>' +
            '<br>' +
            '<h3>Podrás aguantar hasta el final?</h3>' +
            '</div>' +
            '</body>';
    },
    statsBody: function(partida, h1Text, pText){
        return  '<body style="width: 100%; margin: auto; text-align: center; font-family: \'Comic Sans MS\'">' +
            '<div style="width:100%; text-align: right;">' +
            '<a href="#"><h1><strong>FiestaGochi</strong></h1></a>' +
            '</div>' +
            '<div style="width: 100%">' +
            '<h1>' + h1Text + '</h1>' +
            '<p>' + pText+ '</p>' +
            '</div>' +
            '<div style="width:100%; margin-top: 50px;">' +
            '<div class="margin-top: 10px; margin-bottom: 10px;">' +
            '<label for="energia"><h3 style="color:#d9534f;">Subidon</h3></label>' +
            '<div id="energia" name="energia" style="width:100%; background:#D8D8D8;">' +
            '<div style="height:24px; width:' + partida.stats.energia + '%; background:#d9534f;"></div>' +
            '</div>' +
            '</div>' +
            '<div class="margin-top: 10px; margin-bottom: 10px;">' +
            '<label for="sed"><h3 style="color:#337ab7;">Sed</h3></label>' +
            '<div id="sed" name="sed" style="width:100%; background:#D8D8D8;">' +
            '<div style="height:24px; width:' + partida.stats.sed + '%; background:#337ab7;"></div>' +
            '</div>' +
            '</div>' +
            '<div class="margin-top: 10px; margin-bottom: 10px;">' +
            '<label for="alegria"><h3 style="color:#5cb85c;">Alegria</h3></label>' +
            '<div id="alegria" name="alegria" style="width:100%; background:#D8D8D8;">' +
            '<div style="height:24px; width:' + partida.stats.alegria + '%; background:#5cb85c;"></div>' +
            '</div>' +
            '</div>' +
            '<div class="margin-top: 10px; margin-bottom: 10px;">' +
            '<label for="cansancio"><h3 style="color:#f0ad4e;">Cansancio</h3></label>' +
            '<div id="cansancio" name="cansancio" style="width:100%; background:#D8D8D8;">' +
            '<div style="height:24px; width:' + partida.stats.cansancio + '%; background:#f0ad4e;"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</body>';
    },
    consuBody: function(){
        return  '<body style="width: 100%; margin: auto; text-align: center; font-family: \'Comic Sans MS\'">' +
            '<div style="width:100%; text-align: right;">' +
            '<a href="#"><h1><strong>FiestaGochi</strong></h1></a>' +
            '</div>' +
            '<div style="width: 100%">' +
            '<h1>Que no pare la fiesta!</h1>' +
            '<p>Tienes un ticket disponible para recargar tu boticario</p>' +
            '</div>' +
            '</body>';
    },
    errorBody: function (docError) {
        let bodyText = '<body style="width: 100%; margin: auto; text-align: center; font-family: \'Comic Sans MS\'">' +
            '<div style="width:100%; text-align: right;">' +
            '<a href="#"><h1><strong>FiestaGochi</strong></h1></a>' +
            '</div>' +
            '<div style="width: 100%">' +
            '<h1>Se ha producido el error con _id <br>' + docError._id + '</h1>' +
            '<p>En la api ' + docError.api + '</p>' +
            '<p>En la fecha ' + docError.date + '</p><br>' +
            '<h2>Error: <br></h2>';

            _.forEach(docError.error, function (value, index) {
                bodyText += '<h3>' + index + '</h3>';
                bodyText += '<p>' + value + '</p>';
                bodyText += '</br>';
            });

            bodyText += '</div>' +
            '</body>';
            
            return bodyText;
    }
};