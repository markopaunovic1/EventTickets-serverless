const AWS = require('aws-sdk');
const { sendResponse } = require('../responses/index');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {

    const {Items} = await db.scan({
        TableName: 'ticket-db'
    }).promise();

    return sendResponse(200, {success: true, ticket : Items});

}