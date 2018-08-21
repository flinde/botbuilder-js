/**
 * @module botbuilder-dialogs
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext, Activity } from 'botbuilder-core';
import { Prompt, PromptOptions, PromptValidator, PromptRecognizerResult, ListStyle } from './prompt';
import { FoundChoice, ChoiceFactoryOptions, FindChoicesOptions, recognizeChoices } from '../choices';
/**
 * Prompts a user to confirm something with a yes/no response. 
 * 
 * @remarks
 * By default the prompt will return to the calling dialog a `boolean` representing the users 
 * selection.
 */
export class ChoicePrompt extends Prompt<FoundChoice> {

    static defaultChoiceOptions: { [locale: string]: ChoiceFactoryOptions; } = {
        'es-es': { inlineSeparator: ", ", inlineOr: " o ", inlineOrMore: ", o ", includeNumbers: true },
        'nl-nl': { inlineSeparator: ", ", inlineOr: " of ", inlineOrMore: ", of ", includeNumbers: true },
        'en-us': { inlineSeparator: ", ", inlineOr: " or ", inlineOrMore: ", or ", includeNumbers: true },
        'fr-fr': { inlineSeparator: ", ", inlineOr: " ou ", inlineOrMore: ", ou ", includeNumbers: true },
        'de-de': { inlineSeparator: ", ", inlineOr: " oder ", inlineOrMore: ", oder ", includeNumbers: true },
        'ja-jp': { inlineSeparator: "、 ", inlineOr: " または ", inlineOrMore: "、 または ", includeNumbers: true },
        'pt-br': { inlineSeparator: ", ", inlineOr: " ou ", inlineOrMore: ", ou ", includeNumbers: true },
        'zh-cn': { inlineSeparator: "， ", inlineOr: " 要么 ", inlineOrMore: "， 要么 ", includeNumbers: true },
    };

    /**
     * Creates a new `ChoicePrompt` instance.
     * @param dialogId Unique ID of the dialog within its parent `DialogSet`.
     * @param validator (Optional) validator that will be called each time the user responds to the prompt. If the validator replies with a message no additional retry prompt will be sent.  
     * @param defaultLocale (Optional) locale to use if `dc.context.activity.locale` not specified. Defaults to a value of `en-us`.
     */
    constructor(dialogId: string, validator?: PromptValidator<FoundChoice>, defaultLocale?: string) {
        super(dialogId, validator);
        this.style = ListStyle.auto;
        this.defaultLocale = defaultLocale;
    }
    
    public defaultLocale: string|undefined;

    /**
     * Gets or sets the style of the choice list rendered to the user when prompting.
     * 
     * @remarks
     * Defaults to `ListStyle.auto`.
     */
    public style: ListStyle;

    /**
     * Gets or sets additional options passed to the `ChoiceFactory` and used to tweak the style of 
     * choices rendered to the user.
     */
    public choiceOptions: ChoiceFactoryOptions|undefined;

    /**
     * Gets or sets additional options passed to the `recognizeChoices()` function.
     */
    public recognizerOptions: FindChoicesOptions|undefined;

    protected async onPrompt(context: TurnContext, state: any, options: PromptOptions, isRetry: boolean): Promise<void> {
        // Determine locale
        let locale = context.activity.locale || this.defaultLocale;
        if (!locale || !ChoicePrompt.defaultChoiceOptions.hasOwnProperty(locale)) {
            locale = 'en-us';
        }

        // Format prompt to send
        let prompt: Partial<Activity>;
        const choices = options.choices || [];
        const channelId = context.activity.channelId;
        const choiceOptions = this.choiceOptions || ChoicePrompt.defaultChoiceOptions[locale];
        if (isRetry && options.retryPrompt) {
            prompt = this.appendChoices(options.retryPrompt, channelId, choices, this.style, choiceOptions);
        } else {
            prompt = this.appendChoices(options.prompt, channelId, choices, this.style, choiceOptions);
        }

        // Send prompt
        await context.sendActivity(prompt);
    }

    protected async onRecognize(context: TurnContext, state: any, options: PromptOptions): Promise<PromptRecognizerResult<FoundChoice>> {
        
        const result: PromptRecognizerResult<FoundChoice> = { succeeded: false };
        const activity = context.activity;
        const utterance = activity.text;
        const choices = options.choices || [];
        const opt = this.recognizerOptions || {};
        opt.locale = activity.locale || opt.locale || this.defaultLocale || 'en-us';
        const results = recognizeChoices(utterance, choices, opt);
        if (Array.isArray(results) && results.length > 0)
        {
            result.succeeded = true;
            result.value = results[0].resolution;
        }
        return result;
    }
}
