/*
 * Code generated by Microsoft (R) AutoRest Code Generator 1.1.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * @class
 * Initializes a new instance of the ConversationResourceResponse class.
 * @constructor
 * A response containing a resource
 *
 * @member {string} [activityId] ID of the Activity (if sent)
 *
 * @member {string} [serviceUrl] Service endpoint where operations concerning
 * the conversation may be performed
 *
 * @member {string} [id] Id of the resource
 *
 */
class ConversationResourceResponse {
  constructor() {
  }

  /**
   * Defines the metadata of ConversationResourceResponse
   *
   * @returns {object} metadata of ConversationResourceResponse
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ConversationResourceResponse',
      type: {
        name: 'Composite',
        className: 'ConversationResourceResponse',
        modelProperties: {
          activityId: {
            required: false,
            serializedName: 'activityId',
            type: {
              name: 'String'
            }
          },
          serviceUrl: {
            required: false,
            serializedName: 'serviceUrl',
            type: {
              name: 'String'
            }
          },
          id: {
            required: false,
            serializedName: 'id',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ConversationResourceResponse;