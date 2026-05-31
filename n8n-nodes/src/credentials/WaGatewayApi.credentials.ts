import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class WaGatewayApi implements ICredentialType {
  name = 'waGatewayApi';
  displayName = 'WA Gateway API';
  documentationUrl = 'https://github.com/HarishBoke/wagateway-suite';
  icon = 'file:wagateway.svg' as const;

  properties: INodeProperties[] = [
    {
      displayName: 'Server URL',
      name: 'serverUrl',
      type: 'string',
      default: 'https://localhost:2785',
      placeholder: 'https://wa.yourserver.com',
      description:
        'The URL of your WA Gateway server (without trailing slash or /api). Use HTTPS in production.',
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

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'X-API-Key': '={{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.serverUrl}}',
      url: '/api/health',
      method: 'GET',
    },
  };
}
