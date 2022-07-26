const auth = require('./auth');
const queries = require('./queries')

function checkVoucherValidity(request, response) {
    // Verifies given token first
    var validToken = auth.verifyJWT(request);

    // If token is invalid, send forbidden status
    if (validToken == 0) {
        response.sendStatus(403);
    } else {
        // Otherwise check validity of code
        queries.checkValidity(request, response);
    }
};

function checkVoucherVal(request, response) {
    // Verifies given token first
    var validToken = auth.verifyJWT(request);

    if (validToken == 0) {
        // If token is invalid, send forbidden status
        response.sendStatus(403);
    } else {
        // Otherwise check value of code
        queries.checkValue(request, response);
    }
}

module.exports = {
    checkVoucherValidity,
    checkVoucherVal
};