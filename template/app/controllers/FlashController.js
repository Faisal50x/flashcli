

class FlashController {
    async index(Request,Response) {
        Response.status(200).json({
            success: true,
            message: `${Request.path} Method ${Request.method}`
        });
    }
}



module.exports = FlashController;