import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/respone-lib';

export async function main(event, context, callback) {
    const reqBody = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        // 'Item' contains the attributes of the item to be created
        // - 'userId': user identities are federated through the
        //             Cognito Identity Pool, we will use the identity id
        //             as the user id of the authenticated user
        // - 'noteId': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request body
        // - 'createdAt': current Unix timestamp
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: reqBody.content,
            attachment: reqBody.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call('put', params);
        return success(params.Item);
    } catch(e) {
        console.log("Error in put operation", e); // for debugging purposes
        return failure({status: false });
    }
}