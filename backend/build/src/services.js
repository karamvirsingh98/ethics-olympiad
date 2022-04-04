"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customServices = exports.coreServices = void 0;
const feathers_mongoose_1 = require("feathers-mongoose");
const models_1 = require("./services/core/models");
const active_1 = require("./services/custom/active");
const channel_1 = require("./services/custom/channel");
const invite_1 = require("./services/custom/invite");
const unlock_1 = require("./services/custom/unlock");
function coreServices(app) {
    app.use("/api/users", new feathers_mongoose_1.Service({ Model: models_1.UserModel, lean: true }));
    app.use("/api/events", new feathers_mongoose_1.Service({ Model: models_1.EventModel, lean: true }));
    app.use("/api/cases", new feathers_mongoose_1.Service({ Model: models_1.CaseModel, lean: true }));
    app.use("/api/scores", new feathers_mongoose_1.Service({ Model: models_1.ScoreModel, lean: true }));
    app.use("/api/templates", new feathers_mongoose_1.Service({ Model: models_1.TemplateModel, lean: true }));
}
exports.coreServices = coreServices;
function customServices(app) {
    app.use("/api/invite", new invite_1.InviteService(app));
    app.use("/api/unlock", new unlock_1.UnlockService(app));
    app.use("/api/active", new active_1.ActiveEventService(app));
    app.use("/api/channel", new channel_1.ChannelService(app));
}
exports.customServices = customServices;
