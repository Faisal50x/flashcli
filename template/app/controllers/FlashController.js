/** 
 * @author Faisal Ahmed
 * @license MIT
 * */

class FlashController {
    /**
     * @author Faisal Ahmed
     * @param {*} Request 
     * @param {*} Response 
     * @return Response
     */
    async index(Request, Response) {
        return Response.status(200).json({
            success: true,
            message: `${Request.path} Method ${Request.method}`
        });
    }
}



module.exports = FlashController;