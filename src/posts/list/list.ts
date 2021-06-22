import { HttpResponse } from "~utils/http-utils";
import { DynamoService } from "~utils/dynamo-service";

export const handler = async () => {
  const dynamoClient = new DynamoService();
  const { Items: posts } = await dynamoClient.query('tea-table', 'post');
  return HttpResponse.success(posts);
}
