"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@feathersjs/authentication/lib/hooks");
const events_hooks_1 = require("./services/hooks/events.hooks");
const scores_hooks_1 = require("./services/hooks/scores.hooks");
const template_hooks_1 = require("./services/hooks/template.hooks");
const uesrs_hooks_1 = require("./services/hooks/uesrs.hooks");
function default_1(app) {
    //core service hooks
    app.service("api/users").hooks(uesrs_hooks_1.USER_HOOKS);
    app.service("api/events").hooks(events_hooks_1.EVENT_HOOKS);
    app.service("api/cases").hooks({ before: { all: [(0, hooks_1.authenticate)("jwt")] } });
    app.service("api/templates").hooks(template_hooks_1.TEMPLATE_HOOKS);
    app.service("api/scores").hooks(scores_hooks_1.SCORE_HOOKS);
    //custom service hooks
    app.service("api/invite").hooks({ before: { all: [(0, hooks_1.authenticate)("jwt")] } });
}
exports.default = default_1;
