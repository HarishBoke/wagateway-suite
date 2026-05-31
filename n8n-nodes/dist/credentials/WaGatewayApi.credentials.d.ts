import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class WaGatewayApi implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    icon: "file:wagateway.svg";
    properties: INodeProperties[];
    authenticate: IAuthenticateGeneric;
    test: ICredentialTestRequest;
}
