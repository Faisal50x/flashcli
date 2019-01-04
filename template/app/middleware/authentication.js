
module.exports = (Request, Response, next) => {
    //Do something here
    console.log("Authentication Middleware");
    next();
};