const AWS = require('aws-sdk');
const { sendResponse } = require('../responses/index');
const db = new AWS.DynamoDB.DocumentClient();


 /* const generateId = () => {
    const min = 1;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString().padStart(5, '0');
}

const randomNumber = generateId(); */

/* function getRandomInt(max) {
    return Math.floor(Math.random() * max);
} */

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}
const randomString = generateRandomId(15);


exports.handler = async (event, context) => {
    const fromInsomnia = JSON.parse(event.body);
    
    const timestamp = new Date().getTime();
    const newId = `${timestamp}`;


        try {
            await db.put({
                TableName: 'ticket-db',
                Item:  {
                    "id": newId,
                    "ticketNumber": randomString,
                    "evenemang": fromInsomnia.evenemang
                }
            }).promise();

            
            return sendResponse(200, {success: true, body: Item});
        } catch (error) {
            return sendResponse(500, {success: false});
        }
    
}