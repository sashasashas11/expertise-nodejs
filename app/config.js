module.exports = {

  // DEVELOP CONFIG ============================================
  development: {
    HostName: 'http://localhost:3000',
    dbUri: 'mongodb://localhost/expertise_dev',
    logLevel: {  }
  },

  // CONFIG ==============================================
  /*
  *
  *  NOT_DEV CONFIGS BELOW!
  *
  *
   */
  test: {
    HostName: 'http://localhost:3000',
    dbUri: 'mongodb://localhost/automizely_test',
    logLevel: {}
  },

  // PRODUCTION CONFIG ============================================

  production: {
    HostName: 'http://app.expertise.com',
    dbUri: 'mongodb://localhost/expertise',
    logLevel: {}
  },



  get: (function (){
    return this[process.env.NODE_ENV]
  }),

  /*
  * Print current configuration:
  */
  print: (function() {
    var cfg = this.get();
    console.log(
        '\n Configuration (' + process.env.NODE_ENV + '):'
      + '\n - DataBase uri: '         + cfg.dbUri
      + '\n - Log level: '            + (('object' == typeof cfg.logLevel && Object.keys(cfg.logLevel).length > 0)? Object.keys(cfg.logLevel) : 'default')
    );
  })

};