
module.exports = {
    /**
     * @var general
     * @description app general settings
     */
    general: {
        /**
         * @var VERSION
         * @description application current version
         */
        VERSION: require(__basedir + '/package.json').version,
        /**
         * @var PORT
         * @description application default port setup
         */
        PORT: process.env.PORT || 3000,
        /**
         * @var IP
         * @description application default ip address
         */
        IP: process.env.IP || '0.0.0.0',
        /**
         * @var APIPREFIX
         * @description this is api end point url setup
         * @example api/v1
         */
        APIPREFIX: '',
        /**
         * @var ROLES
         * @description application role management setup
         * @default ['guest','user','admin']
         */
        ROLES: ['guest','user','admin']
    },
    session: {
        /**
         * @var SECRET
         * @description this is session secret key change with your own secret key
         */
        SECRET: 'i-am-session-super-secret',
        /**
         * @var EXPIRESIN
         * @description set your own session expire time
         * @default 60*60*24*7 1week
         */
        EXPIRESIN: 60 * 60 * 24 * 7
    }
};

module.exports.database = {
    /**
     * @description setup application environment
     * there are two environment setup option one is development another
     * one is production
     * setup development while your application is development mode
     * when prepare your full application to deploy change environment to production
     */
    environment: "development:mongodb",
    development:{
        /**
         * Mongo DB Setup
         * Use your own mongodb database connection
         */
        mongodb:{
            host: "127.0.0.1",
            port: "27017",
            dbName: "blog",
            dbUser: "",
            dbPass: ""
        },
        /**
         * SQL Database setup option
         * SQL Supported Driver
         * @supported mysql|sqlite|postgres|mssql
         * @default mysql
         */
        sql:{
            driver:'mysql',
            host:'localhost',
            dbName: 'test',
            dbPass:'',
            dbUser:'root',

            // SQLite only
            storage:'path/to/database.sqlite'
        }
    },
    production:{
        /**
         * Mongo DB Setup
         * Use your own mongodb database connection
         */
        mongodb:{
            host: "127.0.0.1",
            port: "27017",
            dbName: "blog",
            dbUser: "",
            dbPass: ""
        },
        /**
         * SQL Database setup option
         * SQL Supported Driver
         * @supported mysql|sqlite|postgres|mssql
         * @default mysql
         */
        sql:{
            driver:'mysql',
            host:'localhost',
            dbName: 'test',
            dbPass:'',
            dbUser:'root',

            // SQLite only
            storage:'path/to/database.sqlite'
        }
    }
};