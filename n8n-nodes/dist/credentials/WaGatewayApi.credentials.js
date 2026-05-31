"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaGatewayApi = void 0;
class WaGatewayApi {
    constructor() {
        this.name = 'waGatewayApi';
        this.displayName = 'WA Gateway API';
        this.documentationUrl = 'https://github.com/HarishBoke/wagateway-suite';
        this.icon = 'file:wagateway.svg';
        this.properties = [
            {
                displayName: 'Server URL',
                name: 'serverUrl',
                type: 'string',
                default: 'https://localhost:2785',
                placeholder: 'https://wa.yourserver.com',
                description: 'The URL of your WA Gateway server (without trailing slash or /api). Use HTTPS in production.',
                required: true,
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                description: 'The API key from your WA Gateway dashboard',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-API-Key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.serverUrl}}',
                url: '/api/health',
                method: 'GET',
            },
        };
    }
}
exports.WaGatewayApi = WaGatewayApi;
//# sourceMappingURL=WaGatewayApi.credentials.js.map