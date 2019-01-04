/**
 * Don't remove this line it's global base directory
 * if you remove this line your application crush immediately
 */
global.__basedir = __dirname;

/**
 * @package flash
 * @author Faisal Ahmed
 * @licence MIT
 * @type {application}
 */


const flash = require('@faisal50x/flash'), app = flash();

/**
 * @package Database
 * @author Faisal Ahmed
 * @description Initialize Database Connection
 * if you want to enable database support
 * remove the double splash from flash.db() beginning of the line
 */

//flash.db();

/**
 * @package Route
 * @author Faisal Ahmed
 * @description Initialize all route
 */
require('./app/config/web')(app);








module.exports = app;

