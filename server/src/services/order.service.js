import Order from "../models/Order.js";

export default {
    create: async (object) => {
        const { name, phone, via, telegram } = object;

        if (!name || !phone || !via) throw new Error("fill");

        const order = new Order({
            name,
            phone,
            via,
            telegram: telegram || ''
        });
        await order.save();
        return true
    }
}