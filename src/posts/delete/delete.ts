import {HttpEvent, HttpResponse} from "~utils/http-utils";
import {S3Service} from "~utils/s3-service";
import {DynamoService} from "~utils/dynamo-service";

export const handler = async (event) => {
  const { postKey } = HttpEvent.extractParams(event);
  console.log(postKey);
  const dynamoClient = new DynamoService();
  const { Item: postToDelete } = await dynamoClient.getItem('tea-table', 'post', postKey);
  console.log(postToDelete);
  const s3Service = new S3Service();

  const s3Result = await deleteS3Resources(postToDelete.resources, s3Service);
  console.log(s3Result);

  const result = await dynamoClient.deleteItem('tea-table', 'post', postKey);
  console.log(result);
  return HttpResponse.success({deleted: true});
}

const deleteS3Resources = async (resources, s3Service: S3Service) => Promise.all(
  resources.map(async resource => await s3Service.deleteItem('tea-posts', resource.objectKey))
);
'2021/6/20/post-23299aa7-f841-4c56-baf8-9cef08c7641e/kk.html'
