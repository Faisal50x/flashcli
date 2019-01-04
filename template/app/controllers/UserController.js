


class UserController {
    async index(Request,Response) {
        Response.status(200).json({
            success: true,
            message: `${Request.path} Method ${Request.method}`
        });
    }
    async profile(Request,Response) {
        Response.status(200).json({
            success: true,
            message: `${Request.path} Method ${Request.method}`
        });
    }

};



module.exports = UserController;