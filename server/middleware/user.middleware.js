const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(400).json({ msg: "Token not found" });

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) throw new Error(err.message);
        req.user = user;
    });

    next();
};

module.exports = auth;
