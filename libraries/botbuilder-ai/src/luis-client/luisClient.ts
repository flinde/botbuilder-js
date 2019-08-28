/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * NOTE: This class was auto generated by OpenAPI Generator (https://openapi-generator.tech)
 * and was manually modified to make it compliant with the current implementation of the library.
 */

const fetch = (new Function('require', 'if (!this.hasOwnProperty("fetch")) { return require("node-fetch"); } else { return this.fetch; }'))(require);

import * as HttpStatus from 'http-status-codes';

/* tslint:disable:no-unused-locals */
import { LuisResult } from './model/luisResult';

import { ObjectSerializer, Authentication, VoidAuth } from './model/models';
import { ApiKeyAuth } from './model/models';

let luisVersion = '/luis/v2.0';

export interface PredictionResolveOptionalParams {
    /**
     * The timezone offset for the location of the request.
     */
    timezoneOffset?: number;
    /**
     * If true, return all intents instead of just the top scoring intent.
     */
    verbose?: boolean;
    /**
     * Use the staging endpoint slot.
     */
    staging?: boolean;
    /**
     * Enable spell checking.
     */
    spellCheck?: boolean;
    /**
     * The subscription key to use when enabling bing spell check
     */
    bingSpellCheckSubscriptionKey?: string;
    /**
     * Log query (default is true)
     */
    log?: boolean;

    customHeaders: {headers: {[name: string]: string}};
}

 /**
  *  Sets headers for request to LUIS service.
  *  LUIS service uses the `Ocp-Apim-Subscription-Key` header. 
  */
export enum LuisApikeys {
    apiKeyHeader,
}

/**
 * Luis Client Class
 *
 * @remarks
 * This is a helper class for all the http request operations against the LUIS API.
 * https://www.luis.ai/
 */
export class LuisClient {
    /** Supported Cognitive Services endpoint (protocol and hostname, for example: https://westus.api.cognitive.microsoft.com) */
    private _basePath: string = '';

    protected authentications = {
        'default': new VoidAuth() as Authentication,
        'apiKeyHeader': new ApiKeyAuth('header', 'Ocp-Apim-Subscription-Key'),
    }

    /** Creates a new instance of LuisClient.
     * @param basePath Supported Cognitive Services endpoint.
     */
    public constructor(basePath: string){
        if (basePath) {
            this._basePath = basePath + luisVersion;
        }
    }

    public setDefaultAuthentication(auth: Authentication): void {
        this.authentications.default = auth;
    }

    public setApiKey(key: LuisApikeys, value: string): void {
        this.authentications[LuisApikeys[key]].apiKey = value;
    }

    /** 
     * Returns the local URL
     * @param appId The appId.
     * @returns String
    */
    private getLocalURL(appId: string): string {
        return this._basePath + '/apps/' + encodeURIComponent(appId); 
    }

    static readonly errorMessages = {
        /**  
        * Message error used in predictionResolvePost and its tests when query is null.
        */
        queryNull: 'Required parameter query was null or undefined when calling predictionResolve.',
        
        /**  
         * Message error used in predictionResolvePost and its tests when appId is null.
        */
        appIdNull: 'Required parameter appId was null or undefined when calling predictionResolve.'
    };
    
    /**
     * Gets predictions for a given utterance, in the form of intents and entities. The current maximum query size is 500 characters.
     * @param query The utterance to predict.
     * @param appId The LUIS application ID (Guid).
     * @param [options] The optional parameters
     * @returns Promise<LuisResult>
     */
    public async predictionResolvePost(query: string, appId: string, options: PredictionResolveOptionalParams): Promise<LuisResult> {        
        const localPath = this.getLocalURL(appId);

        let localHeaderParams = {"content-type": "application/json"};
        let localQueryParameters = {};        

        // verify required parameter 'query' is not null or undefined
        if (query === null || query === undefined) {
            throw new Error(LuisClient.errorMessages.queryNull);
        }

        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new Error(LuisClient.errorMessages.appIdNull);
        }

        if (!options.customHeaders) {
            options.customHeaders = {headers: {}};
        }

        if (options.timezoneOffset !== undefined) {
            localQueryParameters['timezoneOffset'] = ObjectSerializer.serialize(options.timezoneOffset, 'number');
        }

        if (options.verbose !== undefined) {
            localQueryParameters['verbose'] = ObjectSerializer.serialize(options.verbose, 'boolean');
        }

        if (options.staging !== undefined) {
            localQueryParameters['staging'] = ObjectSerializer.serialize(options.staging, 'boolean');
        }

        if (options.spellCheck !== undefined) {
            localQueryParameters['spellCheck'] = ObjectSerializer.serialize(options.spellCheck, 'boolean');
        }

        if (options.bingSpellCheckSubscriptionKey !== undefined) {
            localQueryParameters['bing-spell-check-subscription-key'] = ObjectSerializer.serialize(options.bingSpellCheckSubscriptionKey, 'string');
        }

        if (options.log !== undefined) {
            localQueryParameters['log'] = ObjectSerializer.serialize(options.log, 'boolean');
        }

        Object.assign(localHeaderParams, options.customHeaders.headers);        

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))        
            
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(query),
            headers: localHeaderParams
        };
        this.authentications.apiKeyHeader.applyToRequest(requestOptions);
        this.authentications.default.applyToRequest(requestOptions);

        return new Promise<LuisResult>((resolve, reject) => {
            fetch(url, requestOptions).then(response => {
                if (response.status && response.status >= HttpStatus.OK && response.status < HttpStatus.MULTIPLE_CHOICES) {
                    response.json().then(result => {
                        let luisResult = ObjectSerializer.deserialize(result, "LuisResult");
                        resolve(luisResult);
                    });
                } else {
                    reject({
                        response: {
                            response: response,
                            headers: response.headers,
                            body: response.body,
                            status: response.status
                        }
                    });
                }
            });
        });
    }
}