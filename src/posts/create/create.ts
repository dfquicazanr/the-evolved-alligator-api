import {HttpEvent, HttpResponse} from "~utils/http-utils";
import {sanitize} from "~utils/s3-key-sanitizer";
import {S3Service} from "~utils/s3-service";
import {DynamoService} from "~utils/dynamo-service";
import {itemKey} from "~utils/keys-utils";
import {dateToPath} from "~utils/date-utils";

export const handler = async (event) => {
  const attributes = HttpEvent.extractBody(event);
  console.log(attributes);
  let { resources } = attributes;
  const { title, date } = attributes;
  const datePath = dateToPath(new Date(date));
  const postKey = itemKey('post')

  resources = resources.map(resource => ({...resource, filePath: `${datePath}/${postKey}/${sanitize(resource.filename)}`}));

  console.log(resources);
  const s3Service = new S3Service();
  resources = await Promise.all(resources.map(async resource => (
    {
      ...resource,
      s3SignedUrl: await s3Service.getSignedS3Url('tea-posts', resource.filePath),
      filePath: `https://tea-posts.s3.amazonaws.com/${resource.filePath}`
    }
  )));
  console.log(resources);
  const dynamoClient = new DynamoService();
  const result = await dynamoClient.putItem('tea-table', 'post', postKey, attributes);
  console.log(result);
  return HttpResponse.success({title, date, postKey, resources});
}
