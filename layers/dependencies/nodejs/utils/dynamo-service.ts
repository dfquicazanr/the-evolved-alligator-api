import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoService {

  private dynamoDB: DocumentClient;

  constructor() {
    this.dynamoDB = new DocumentClient();
  }

  scan(tableName: string): any {
    return this.dynamoDB.scan({TableName: tableName}).promise();
  }

  query(tableName: string, pk: string, sk?: string) {
    const params = {
      TableName: tableName,
      KeyConditionExpression: `pk = :pk${sk ?` and sk = :sk`: ``}`,
      ExpressionAttributeValues: {
        ":pk": pk,
        ...!!sk && {":sk": sk}
      }
    }
    return this.dynamoDB.query(params).promise();
  }

  putItem(tableName: string, pk: string, sk: string, item: {}, lsi1: string = 'unused-key'): any {
    const params = {
      TableName: tableName,
      Item: {
        pk,
        sk,
        lsi1,
        lsi2: new Date().toISOString(),
        ...item
      }
    }
    return this.dynamoDB.put(params).promise()
  }

  getItem(tableName: string, pk: string, sk: string): any {
    const params = {
      TableName: tableName,
      Key: {
        pk,
        sk
      }
    };
    return this.dynamoDB.get(params).promise();
  }

  deleteItem(tableName: string, pk: string, sk: string): any {
    const params = {
      TableName: tableName,
      Key: {
        pk,
        sk
      }
    }
    return this.dynamoDB.delete(params).promise();
  }
}
