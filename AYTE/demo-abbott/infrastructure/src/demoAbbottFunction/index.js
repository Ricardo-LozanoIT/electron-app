import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const getItem = async (id) => {
  console.log("before get")
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


export const putItem = async (params, code) => {
  console.log("before put")
  const { TableName, Item} = params
  const command = new PutItemCommand({
    TableName: TableName,
    Item: Item,
  });

  const response = await client.send(command);
  console.log("putResponse",response);

  if(code == "231540"){
    return response;
  }
};

export const handler = async (event, context, callback) => {
  // Create a put event to send data to dynamoDB
  const id = "100640110";
  const params = {
    "TableName": "demo-abbott-demoAbbott-1TMM2C43BCIKL",
    "Item": {
      "id-card": {"N": "100640110"},
      "create-date": {"S": "06/06/2024"},
      "mail": {"S": "prueba@ayte.co"},
      "name": {"S": "Camila"},
      "phone": {"S": "+57 301010451"},
      "visitor": {
        "L": [
          {
            "M": {
              "count": { "N": "5" },
              "name": { "S": "Visitor M" },
              "product": { "S": "sevedol" }
            }
          }
        ]
      }
    },
  }
  const code = event.queryStringParameters.code;

  await getItem(id);
  await putItem(params, code);

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
