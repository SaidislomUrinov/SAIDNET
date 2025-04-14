import Admin from "../models/Admin.js";

export default {
    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) throw new Error("Username and password are required");

            const admin = await Admin.findOne({ username: username?.toLowerCase()?.trim() });

            if (!admin || !await admin.checkPassword(password)) throw new Error("Invalid username or password");

            const access = await admin.signIn();

            return res.send({
                ok: true,
                msg: "Welcome back!",
                access,
                data: {
                    _id: admin._id,
                    name: admin.name,
                    username: admin.username,
                }
            });

        } catch (error) {
            return res.send({
                ok: false,
                msg: error.message
            });
        }
    },
    verify: async (req, res) => {
        return res.send({
            ok: true,
            data: {
                _id: req.admin._id,
                name: req.admin.name,
                username: req.admin.username,
            }
        })
    }
}