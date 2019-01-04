/** 
 * @author Faisal Ahmed
 * @license MIT
 * */
module.exports = (Request, Response, next) => {
    //Do something here
    console.log("Role Middleware");
    next();
};