import {HttpEvent, HttpResponse} from "~utils/http-utils";
import {sanitize} from "~utils/s3-key-sanitizer";
import {S3Service} from "~utils/s3-service";

export const handler = async (event) => {
  const attributes = HttpEvent.extractBody(event);
  const s3Service = new S3Service();
  const { fileUrl } = attributes;
  attributes.fileUrl = `https://${sanitize(fileUrl.split('https://')[1])}`;
  const file = await s3Service.getItem('tea-posts', fileUrl.split('https://tea-posts.s3.amazonaws.com/'));
  // console.log(file);
  // const dynamoClient = new DynamoService();
  // const result = await dynamoClient.putItem('remona-table', 'guide', itemKey('g'), attributes);
  // console.log(result);
  return HttpResponse.success(file);
}