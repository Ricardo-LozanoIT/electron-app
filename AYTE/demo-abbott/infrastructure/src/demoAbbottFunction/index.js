import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// Set the AWS Region.
const REGION = "us-east-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION });

// Create an Amazon DynamoDB service client object.
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getItem = async (id) => {
  console.log("before get");
  const command = new GetItemCommand({
    TableName: "demo-abbott-demoAbbott-1TMM2C43BCIKL",
    Key: {
      "id-card": { N: id },
    },
  });

  const response = await client.send(command);
  if (!response.Item) {
    return null;
  }
  const regularObject = unmarshall(response.Item);
  console.log("getResponse", regularObject);

  return regularObject;
};

export const updateItem = async (id, code) => {
  console.log("before update");
  const params = {
    TableName: "demo-abbott-demoAbbott-1TMM2C43BCIKL",
    Key: {
      "id-card": { N: id },
    },
    UpdateExpression: "set code = :code",
    ExpressionAttributeValues: { ":code": { N: "" + code } },
    ReturnValues: "ALL_NEW",
  };
  const command = new UpdateItemCommand(params);
  const response = await client.send(command);
  console.log("updateResponse", response);
  return response;
};

export const puitItem = async (id, putData) => {
  console.log("before put");
  const command = new UpdateCommand({
    TableName: "demo-abbott-demoAbbott-1TMM2C43BCIKL",
    Key: {
      "id-card": +id,
    },
    UpdateExpression: "set visitor = :visitor",
    ExpressionAttributeValues: {
      ":visitor": putData,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  console.log("updateResponse", response);
  return response;
};

const sendEmail = async (recipient, code) => {
  // Send email
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `Para verificar su correo electrónico, use esta contraseña de un solo uso (OTP): ${code}`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Verifique su dirección de correo electrónico de Abbott",
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
  const id = event.queryStringParameters?.id;
  const code = event.queryStringParameters?.code;
  let otpCode = Math.floor(100000 + Math.random() * 900000);
  let allow = false;

  console.log("event", event);
  if (event.httpMethod == "GET" && id && event.path != "/code") {
    const responseDynamo = await getItem(id);
    if (responseDynamo == null) {
      allow = false;
    } else {
      allow = true;
      try {
        const responseMail = await sendEmail(responseDynamo?.mail, otpCode);
        console.log("response email send", responseMail);
        await updateItem(id, otpCode);
      } catch (error) {
        console.error("Error Sending email", error);
      }
    }
  } else if (event.httpMethod == "GET" && event.path == "/code" && code && id) {
    const responseDynamo = await getItem(id);
    if (responseDynamo != null && responseDynamo?.code == code) {
      allow = true;
    } else {
      allow = false;
    }
  } else if (event.httpMethod == "PUT" && event.body) {
    const responseDynamo = await getItem(id);
    if (responseDynamo){
      const visitor = responseDynamo?.visitor;
      const data = JSON.parse(event.body);
      const index = visitor.findIndex((e) => e.product+e.name == data[0].product+data[0].name)
      let putData = [];

      if (index >= 0){
        visitor[index].count = data[0].count+visitor[index].count;
        putData = visitor;
      }else {
        putData = [...visitor, ...data];
      }
      console.log('putData', putData);
      await puitItem(id, putData);
    }
  }

  let res = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  };
  res.body = JSON.stringify({ allow });
  callback(null, res);
};
