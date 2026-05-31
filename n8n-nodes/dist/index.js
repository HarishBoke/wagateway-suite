"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaGatewayTrigger = exports.WaGateway = exports.WaGatewayApi = void 0;
// Credentials
var WaGatewayApi_credentials_1 = require("./credentials/WaGatewayApi.credentials");
Object.defineProperty(exports, "WaGatewayApi", { enumerable: true, get: function () { return WaGatewayApi_credentials_1.WaGatewayApi; } });
// Nodes
var WaGateway_node_1 = require("./nodes/WaGateway/WaGateway.node");
Object.defineProperty(exports, "WaGateway", { enumerable: true, get: function () { return WaGateway_node_1.WaGateway; } });
var WaGatewayTrigger_node_1 = require("./nodes/WaGatewayTrigger/WaGatewayTrigger.node");
Object.defineProperty(exports, "WaGatewayTrigger", { enumerable: true, get: function () { return WaGatewayTrigger_node_1.WaGatewayTrigger; } });
//# sourceMappingURL=index.js.map