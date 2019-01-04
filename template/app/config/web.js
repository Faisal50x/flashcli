const flash = require('@faisal50x/flash');

/** 
 * @author Faisal Ahmed
 * @version 1.0.3
 * @license MIT
 * */

module.exports = (app) => {
    const Router = flash.router(app);

    Router.group('/', function () {

        Router.get('/', "FlashController@index");
        Router.get('/welcome', (req, res) => {
            res.json({
                success: "true",
                message: `Welcome to ${req.path} Method ${req.method}`
            });
        });

    });

    Router.group('/auth', ["Authentication"], function () {

        Router.post('/login', (req, res) => {
            res.json({
                success: "true",
                message: `Welcome to ${req.path} Method ${req.method}`
            });
        });
        Router.get('/welcome', "FlashController@index");

    });
};