const jwt = require("jsonwebtoken");

const secret = "#Roadsterlife"; 

// List of routes that don't require token
const excludedRoutes = ["/login", "/register"];

const verifyToken = (req, res, next) => {
    if (excludedRoutes.includes(req.path)) {
        return next(); // Skip auth for these routes
    }

    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // You can access `req.user` in routes
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = verifyToken;
