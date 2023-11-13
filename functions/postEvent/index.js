const AWS = require('aws-sdk');
const { sendResponse } = require('../responses/index');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {

    const events = JSON.parse(event.body);

    const timestamp = new Date().getTime();

    events.id = `${timestamp}`;

    try {
        await db.put({
            TableName: 'events-db',
            Item: events
        }).promise();

        return sendResponse(200, {success: true, body: events});
    } catch (error) {
        return sendResponse(500, {success: false});
    }
    
}