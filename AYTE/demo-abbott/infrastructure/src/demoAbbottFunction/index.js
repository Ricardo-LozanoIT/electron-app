import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

// Set the AWS Region.
const REGION = "us-east-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION });

// Create an Amazon DynamoDB service client object.
const client = new DynamoDBClient({});

export const getItem = async (id) => {
  console.log("before");
  const command = new GetItemCommand({
    TableName: "demo-abbott-demoAbbott-1TMM2C43BCIKL",
    Key: {
      "id-card": { N: id },
    },
  });

  const response = await client.send(command);
  console.log("getResponse", response);
  return response;
};

const sendEmail = async (recipient) => {
  // Send email
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: "Hello, world!",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "TEST SES EMAIL",
      },
    },
    Source: "juan.paredes@ayte.co",
  });
  try {
    return await sesClient.send(command);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

export const handler = async (event, context, callback) => {
  // Create a put event to send data to dynamoDB
  const id = "123456789";
  await getItem(id);
  console.log("event", event);
  if (event.httpMethod == "GET") {
    console.log("esto es un GET");
    try {
      const response = await sendEmail("juan.paredes@ayte.co");
      console.log("response email send", response);
    } catch (error) {
      console.error("Error Sending email", error);
    }
  } else if (event.httpMethod == "PUT") {
    console.log("esto es un PUT");
  }

  let res = {
    statusCode: 200,
    headers: {
      "Content-Type": "*/*",
    },
  };
  res.body = "Hello, " + "world" + "!";
  callback(null, res);
};
