var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "josephemmanuel1",
    database: "ldxvouchersys"
});

function startConnection() {
    con.connect(function(err) {
        if (err) throw err;
    });
};


function endConnection() {
    con.end(function(err) {
        if (err) throw err;
    });
};

function checkValidity(request, response) {
    const {
        voucherCode
    } = request.body;

    // Find voucher in database according to code given
    con.query(`SELECT * FROM Vouchers WHERE code = '${voucherCode}'`, function(err, result) {
        if (err) {
            throw err
        }

        // Find if returned object has a length
        var objSize = Object.keys(result).length;
        var isEmpty = 0;
        if (objSize == 0) {
            // If returned object has length 0, it means that it is empty
            // Invalid code
            isEmpty = 1;
        } else {
            // Otherwise set instance to returned voucher db row
            instance = result[0];
        }
        
        if (isEmpty == 1) {
            // If it is empty send that it is an invalid code
            response.status(200).json({"validity": "False", "message": "Wrong Code"});
        } else {
            // Check if code is token even if it is valid
            if (instance['taken'] == 1) {
                response.status(200).json({"validity": "False", "message": "Voucher Taken"});
            } else {
                response.status(200).json({"validity": "True", "message": "na"});
            }
        }
        
    });
};

function checkValue(request, response) {
    const {
        voucherCode
    } = request.body;

    // Find voucher row in database according to code given
    con.query(`SELECT * FROM Vouchers WHERE code = '${voucherCode}'`, function(err, result) {
        if (err) throw err;

        // Find if returned object has values inside it
        var objSize = Object.keys(result).length;
        var isEmpty = 0;
        if (objSize == 0) {
            // If it is empty, invalid code
            isEmpty = 1;
        } else {
            // Otherwise if it isn't empty, set instance to db row
            instance = result[0];
        }

        if (isEmpty == 1) {
            // Invalid code if empty
            response.status(200).json("Invalid code");
        } else {
            // Return value of voucher if not empty
            response.status(200).json(instance['voucherValue']);
        }

    });
};

function verifyUser(email, password) {
    // Find instance of user in database according to email and password given
    con.query(`SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`, function(err, result) {
        if (err) throw err;

        // Check if there is a valid user with that username and password
        var objSize = Object.keys(result).length;
        if (objSize == 0) {
            // If returned object is false, send 0 to represent False bool
            return 0;
        } else {
            // Otherwise set instance to row and send user details for payload
            instance = result[0];

            const user = {
                id: instance['id'],
                email: instance['email'],
                password: instance['password']
            };

            return user;
        }
    });
};

module.exports = {
    startConnection,
    endConnection,
    checkValidity,
    checkValue,
    verifyUser
};