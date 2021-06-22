import {HttpEvent, HttpResponse} from "~utils/http-utils";
import {sanitize} from "~utils/key-sanitizer";
import {S3Service} from "~utils/s3-service";
import {DynamoService} from "~utils/dynamo-service";
import {dateToPath} from "~utils/date-utils";

export const handler = async (event) => {
  const { postKey } = HttpEvent.extractParams(event);
  const attributes = HttpEvent.extractBody(event);
  console.log(attributes);
  let { resources } = attributes;
  const { title, date } = attributes;
  const datePath = dateToPath(new Date(date));

  resources = addObjectKeyToResources(resources, postKey, datePath);
  resources = addFilePathToResources(resources);

  console.log(resources);
  const s3Service = new S3Service();
  const resourcesWithSignedUrls = await addS3SignedUrlsToResources(resources, s3Service);
  console.log(resourcesWithSignedUrls);
  const dynamoClient = new DynamoService();
  const result = await dynamoClient.putItem('tea-table', 'post', postKey, {...attributes, resources});
  console.log(result);
  return HttpResponse.success({title, date, postKey, resources: resourcesWithSignedUrls});
}

const addObjectKeyToResources = (resources, postKey, datePath) =>
  resources.map(resource => (
    {
      ...resource,
      objectKey: `${datePath}/${postKey}/${sanitize(resource.filename)}`
    })
  );

const addFilePathToResources = (resources) =>
  resources.map(resource => (
    {
      ...resource,
      filePath: `https://tea-posts.s3.amazonaws.com/${resource.objectKey}`
    })
  );

const addS3SignedUrlsToResources = async (resources, s3Service) => Promise.all(resources.map(async resource => (
  {
    ...resource,
    s3SignedUrl: await s3Service.getSignedS3Url('tea-posts', resource.objectKey)
  }
)));
