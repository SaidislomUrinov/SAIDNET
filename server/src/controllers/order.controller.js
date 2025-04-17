import orderService from "../services/order.service.js"

export default {
    create: async (req, res) => {
        try {
            const result = await orderService.create(req.body);

            if (!result) throw new Error("fill");

            return res.send({
                ok: true,
                msg: "success"
            });

        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message
            })
        }
    }
}