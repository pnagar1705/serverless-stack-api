import AWS from 'aws-sdk';

export function call(action, params) {
//  if your DynamoDB table is in a different region, make sure to set it by calling AWS.config.update({ region: "my-region" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
}