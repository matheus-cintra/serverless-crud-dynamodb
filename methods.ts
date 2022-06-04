import { DynamoDB } from "aws-sdk";
import { randomUUID } from "crypto";
import { serverResponse } from "./response";

const database = new DynamoDB.DocumentClient();
const tableName = "customers-table-dev";

export const getCustomer = async (body: any) => {
  try {
    const params = { TableName: tableName };

    const result = await database.scan(params).promise();

    return serverResponse(200, "GET", result.Items);
  } catch (error) {
    return serverResponse(500, "GET", error);
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const result = await database.get(params).promise();
    return serverResponse(200, "GET", result.Item);
  } catch (error) {
    return serverResponse(500, "GET", error);
  }
};

export const postCustomer = async (body: any) => {
  try {
    body = JSON.parse(body);

    let params: any = {
      TableName: tableName,
      Item: {
        id: randomUUID(),
      },
    };

    for (const key in body) {
      params.Item[key] = body[key];
    }

    const result = await database.put(params).promise();

    return serverResponse(201, "POST", result);
  } catch (error) {
    return serverResponse(500, "POST", error);
  }
};

export const putCustomer = async (id: string, body: any) => {
  try {
    body = JSON.parse(body);

    const params: any = {
      TableName: tableName,
      Key: {
        id,
      },
      UpdateExpression: "set",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: "ALL_NEW",
    };

    for (const key in body) {
      params.UpdateExpression += ` #${key} = :${key},`;
      params.ExpressionAttributeNames[`#${key}`] = key;
      params.ExpressionAttributeValues[`:${key}`] = body[key];
    }

    params.UpdateExpression = params.UpdateExpression.slice(0, -1);

    const result = await database.update(params).promise();

    return serverResponse(200, "PUT", result);
  } catch (error) {
    return serverResponse(500, "PUT", error);
  }
};

export const delCustomer = async (id: string, body: any) => {
  try {
    const params: any = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const result = await database.delete(params).promise();

    return serverResponse(200, "DELETE", result);
  } catch (error) {
    return serverResponse(500, "DELETE", error);
  }
};
