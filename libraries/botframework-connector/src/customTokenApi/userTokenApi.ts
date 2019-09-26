/**
 * Microsoft Bot Token API - V3.1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: token
 * Contact: botframework@microsoft.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
const fetch = (new Function('require', 'if (!this.hasOwnProperty("fetch")) { return require("node-fetch"); } else { return this.fetch; }'))(require);
import * as HttpStatus from 'http-status-codes';
import http = require('http');
import * as Models from './model';

/* tslint:disable:no-unused-locals */
import { CustomMicrosoftAppCredentials } from '../auth'
import { ObjectSerializer } from './model/models';
import { CustomTokenApiClient } from './customTokenApiClient';



// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum UserTokenApiApiKeys {
}

export class UserTokenApi {
    protected _basePath: string;
    protected defaultHeaders = {};    
    protected credentials: CustomMicrosoftAppCredentials;
    protected userAgent: string;

    constructor(client: CustomTokenApiClient){
        this.credentials = client.credentials;
        this.defaultHeaders = {"content-type": client.requestContentType};
        this.userAgent = client.userAgent;
        this.basePath = client.baseUri;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    private async deserializeResponse<T>(url, requestOptions, type): Promise<T> {
        return new Promise<T>((resolve) => {
            fetch(url, requestOptions).then(response => {         
                let httpResponse: http.IncomingMessage = response;
                
                if (response.status &&  response.status >= HttpStatus.OK && response.status < HttpStatus.MULTIPLE_CHOICES) { 
                    response.json().then(result => {
                        let _body: T = ObjectSerializer.deserialize(result, type);
                        let _bodyAsText: string = _body == undefined? "" : ObjectSerializer.deserialize(result, "string");
                        let _response = Object.assign(httpResponse, {bodyAsText: _bodyAsText, parsedBody: _body});
                        let toReturn: T = _body == undefined? Object.assign( {_response: _response}) : Object.assign(_body, {_response: _response});

                        resolve(toReturn);
                    });
                } else {
                    let toReturn: T = Object.assign({_response: httpResponse});   

                    resolve(toReturn);
                }                
            });
        });
    }

    /**
     * 
     * @param aadResourceUrls 
     * @param userId 
     * @param connectionName 
     * @param channelId 
     */
    public async getAadTokens (userId: string, connectionName: string, aadResourceUrls: Models.AadResourceUrls, options: Models.UserTokenGetAadTokensOptionalParams = {headers: {}}) : Promise<Models.UserTokenGetAadTokensResponse> {
        const localPath = this.basePath + '/api/usertoken/GetAadTokens';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);        

        // verify required parameter 'aadResourceUrls' is not null or undefined
        if (aadResourceUrls === null || aadResourceUrls === undefined) {
            throw new Error('Required parameter aadResourceUrls was null or undefined when calling userTokenGetAadTokens.');
        }

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling userTokenGetAadTokens.');
        }

        // verify required parameter 'connectionName' is not null or undefined
        if (connectionName === null || connectionName === undefined) {
            throw new Error('Required parameter connectionName was null or undefined when calling userTokenGetAadTokens.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ObjectSerializer.serialize(userId, "string");
        }

        if (connectionName !== undefined) {
            localQueryParameters['connectionName'] = ObjectSerializer.serialize(connectionName, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ObjectSerializer.serialize(options.channelId, "string");
        }

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'POST',
            uri: localPath,
            headers: localHeaderParams,            
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);       

        return this.deserializeResponse<Models.UserTokenGetAadTokensResponse>(url, requestOptions, "{ [key: string]: TokenResponse; }");
    }
    /**
     * 
     * @param userId 
     * @param connectionName 
     * @param channelId 
     * @param code 
     */
    public async getToken (userId: string, connectionName: string, options: Models.UserTokenGetTokenOptionalParams = {headers: {}}) : Promise<Models.UserTokenGetTokenResponse> {
        const localPath = this.basePath + '/api/usertoken/GetToken';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);        

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling userTokenGetToken.');
        }

        // verify required parameter 'connectionName' is not null or undefined
        if (connectionName === null || connectionName === undefined) {
            throw new Error('Required parameter connectionName was null or undefined when calling userTokenGetToken.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ObjectSerializer.serialize(userId, "string");
        }

        if (connectionName !== undefined) {
            localQueryParameters['connectionName'] = ObjectSerializer.serialize(connectionName, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ObjectSerializer.serialize(options.channelId, "string");
        }

        if (options.code !== undefined || options.code != null) { 
            localQueryParameters['code'] = ObjectSerializer.serialize(options.code, "string");
        }        

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'GET',
            uri: localPath,
            headers: localHeaderParams,            
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<Models.UserTokenGetTokenResponse>(url, requestOptions, "TokenResponse");
    }
    /**
     * 
     * @param userId 
     * @param channelId 
     * @param include 
     */
    public async getTokenStatus (userId: string, options: Models.UserTokenGetTokenStatusOptionalParams = {headers: {}}) : Promise<Models.UserTokenGetTokenStatusResponse> {
        const localPath = this.basePath + '/api/usertoken/GetTokenStatus';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling userTokenGetTokenStatus.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ObjectSerializer.serialize(userId, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ObjectSerializer.serialize(options.channelId, "string");
        }

        if (options.include !== undefined) {
            localQueryParameters['include'] = ObjectSerializer.serialize(options.include, "string");
        }

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'GET',
            uri: localPath,
            headers: localHeaderParams,
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<Models.UserTokenGetTokenStatusResponse>(url, requestOptions, "Array<TokenStatus>");  
    }
    /**
     * 
     * @param userId
     * @param connectionName 
     * @param channelId
     */
    public async signOut (userId: string, options: Models.UserTokenSignOutOptionalParams = {headers: {}}) : Promise<Models.UserTokenSignOutResponse> {
        const localPath = this.basePath + '/api/usertoken/SignOut';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);        

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling userTokenSignOut.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ObjectSerializer.serialize(userId, "string");
        }

        if (options.connectionName !== undefined) {
            localQueryParameters['connectionName'] = ObjectSerializer.serialize(options.connectionName, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ObjectSerializer.serialize(options.channelId, "string");
        }

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'DELETE',
            uri: localPath,
            headers: localHeaderParams,            
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);

        return new Promise<Models.UserTokenSignOutResponse>((resolve, reject) => {
            fetch(url, requestOptions).then(response => {         
                let httpResponse: http.IncomingMessage = response;
                
                if (response.status &&  response.status >= HttpStatus.OK && response.status < HttpStatus.MULTIPLE_CHOICES) { 
                    response.text().then(result => {
                        let _body: string = ObjectSerializer.deserialize(result, "string");
                        let _bodyAsText: string = _body == undefined? "" : ObjectSerializer.deserialize(result, "string");
                        let _response = Object.assign(httpResponse, {bodyAsText: _bodyAsText, parsedBody: _body}); 

                        resolve({body: _body, _response: _response});
                    });
                } else {
                    let toReturn: Models.UserTokenSignOutResponse = Object.assign({_response: httpResponse});   
                    resolve(toReturn);
                }                
            });
        });
    }
}
