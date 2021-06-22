import {HttpEvent, HttpResponse} from "~utils/http-utils";
import { DynamoService } from "~utils/dynamo-service";

export const handler = async (event) => {
  const { postKey } = HttpEvent.extractParams(event);
  const dynamoClient = new DynamoService();
  const { Items: posts } = await dynamoClient.query('tea-table', 'post', postKey);
  return HttpResponse.success(posts[0]);
}
