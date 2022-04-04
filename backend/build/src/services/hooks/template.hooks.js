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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_HOOKS = void 0;
const hooks_1 = require("@feathersjs/authentication/lib/hooks");
const handleTemplateDelete = () => {
    return (context) => __awaiter(void 0, void 0, void 0, function* () {
        const id = context.id;
        const eventsToRemove = yield context.app
            .service("api/events")
            .find({ query: { templateID: id } });
        yield Promise.all(eventsToRemove.map((event) => context.app.service("api/events").remove(event._id)));
        return context;
    });
};
exports.TEMPLATE_HOOKS = {
    before: {
        find: [(0, hooks_1.authenticate)("jwt")],
        get: [(0, hooks_1.authenticate)("jwt")],
        update: [(0, hooks_1.authenticate)("jwt")],
        patch: [(0, hooks_1.authenticate)("jwt")],
        remove: [(0, hooks_1.authenticate)("jwt")],
    },
    after: {
        remove: [handleTemplateDelete()],
    },
};
