const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: 'Authorization header is missing',
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token is missing',
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {

            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized User',
                });
            }

            // Store authenticated user information here
            req.user = decode;

            next();
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: 'Error In Auth API',
            error: error.message,
        });
    }
};