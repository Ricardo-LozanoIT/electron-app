import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getItem = async (id) => {
  const command = new GetCommand({
    TableName: "demo-abbott-demoAbbott-1TMM2C43BCIKL",
    Key: {
      "id-card": id,
    },
  });

  const response = await docClient.send(command);
  console.log("getResponse", response);
  return response;
};

export const handler = async (event) => {
  // Create a put event to send data to dynamoDB
  const id = "123456789";
  await getItem(id);
  console.log("event", event);

  let res = {
    statusCode: 200,
    headers: {
      "Content-Type": "*/*",
    },
  };
  res.body = "Hello, " + "world" + "!";
  callback(null, res);
};
