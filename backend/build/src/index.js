"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feathers_1 = __importDefault(require("@feathersjs/feathers"));
const configuration_1 = __importDefault(require("@feathersjs/configuration"));
const primus_1 = __importDefault(require("@feathersjs/primus"));
const mongoose_1 = __importDefault(require("mongoose"));
const services_1 = require("./services");
const hooks_1 = __importDefault(require("./hooks"));
const authentication_1 = __importDefault(require("./services/core/authentication"));
const client_1 = __importDefault(require("./client"));
const app = (0, feathers_1.default)().configure((0, configuration_1.default)());
app.configure((0, primus_1.default)({ transformer: "websockets" }, (primus) => {
    primus.library();
    primus.save(__dirname + "/primus.js");
}));
mongoose_1.default.connect(app.get("mongodb"));
app.configure(authentication_1.default);
app.configure(services_1.coreServices);
app.configure(services_1.customServices);
app.configure(hooks_1.default);
app.listen(app.get("port") || 3030).on("listening", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("websocket server on port: ", process.env.PORT);
    if (process.env.NODE_ENV !== "production")
        yield (0, client_1.default)();
    console.log("======================");
    console.log("====Setup Complete====");
    console.log("======================");
    app.on("connection", (c) => app.channel("general").join(c));
    app
        .service("api/active")
        .publish((data, { params }) => app
        .channel(`events/${data.eventID}`)
        .filter((c) => c !== params.connection));
    app
        .service("api/active")
        .publish("scored", (data) => app.channel(`events/${data.eventID}`));
}));
