import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const getItem = async (id) => {
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
