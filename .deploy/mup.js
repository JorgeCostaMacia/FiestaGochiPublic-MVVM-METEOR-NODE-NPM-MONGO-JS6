module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: 'jorgecostamacia.me',
      username: 'root',
      password: '***********'
    }
  },
  app: {
    // TODO: change app name and path
    name: 'fiestagochi',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://jorgecostamacia.me',
      MONGO_URL: 'mongodb://fiestagochi:***********@ds111410.mlab.com:11410/fiestagochi',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },


    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  //mongo: {
  //  version: '3.4.1',
  //  servers: {
  //    one: {}
  //  }
  //},

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

   proxy: {
       domains: 'jorgecostamacia.me,www.jorgecostamacia.me',

     ssl: {
       // Enable Let's Encrypt
       letsEncryptEmail: 'fiestagochi@gmail.com',
         forceSSL: true
     }
  }
};
