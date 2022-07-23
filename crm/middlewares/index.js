const verifySignUp = require("./verifySignUp");
const authJwt = require("./auth.jwt");
/**
 * I can add more middleware here as the project grows
 */

module.exports = {
    verifySignUp,
    authJwt
}