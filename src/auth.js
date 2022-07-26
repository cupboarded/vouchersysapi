const dbConnect = require('./queries');
const jwt = require('jsonwebtoken');
const config = require('./config');

function signJWT(request, response) {
    const {
        email,
        password
    } = request.body

    // Check if user is valid
    user = dbConnect.verifyUser(email, password);

    // If invalid user, send forbidden status
    if (user == 0) {
        response.sendStatus(403);
    } else {
        // Otherwise sign JWT according to the user
        // Lasting 15 minutes
        jwt.sign({user}, config.secret, { expiresIn: '15m' }, (err, token) => {
            if (err) {
                throw err;
            };

            // Send token
            response.status(200).json(token);
        });
    }
};

function getToken(request, response, next) {
    // Get authorization header
    const bearerHeader = request.headers['authorization'];

    // Check if auth header is valid
    if (typeof bearerHeader !== 'undefined') {
        // Get token from string by splitting
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    } else {
        // If it is invalid, send forbidden code
        response.sendStatus(403);
    }
};

function verifyJWT(request) {
    // Verifies if the token is valid
    try {
        const jwtTest = jwt.verify(request.token, config.secret);
    } catch(err) {
        return 0;
    }
};

module.exports = {
    signJWT,
    getToken,
    verifyJWT
}