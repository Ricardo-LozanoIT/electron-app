import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

export const getItem = async (id) => {
  console.log("before")
  const command = new GetItemCommand({
    "TableName": "demo-abbott-demoAbbott-1TMM2C43BCIKL",
    "Key": {
      "id-card": {"N": id},
    },
  });

  const response = await client.send(command);
  console.log("getResponse", response);
  return response;
};

export const handler = async (event, context, callback) => {
  // Create a put event to send data to dynamoDB
  const id = "123456789";
  await getItem(id);
  console.log("event", event);
  if(event.httpMethod == 'GET'){
    console.log("esto es un GET")
  } else if(event.httpMethod == 'PUT'){
    console.log("esto es un PUT")
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
