"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@feathersjs/authentication-local/lib");
const lib_2 = require("@feathersjs/authentication/lib");
function default_1(app) {
    const auth = new lib_2.AuthenticationService(app);
    auth.register("jwt", new lib_2.JWTStrategy());
    auth.register("local", new lib_1.LocalStrategy());
    app.use("/authentication", auth);
}
exports.default = default_1;
