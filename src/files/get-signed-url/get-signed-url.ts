import {HttpEvent, HttpResponse} from "~utils/http-utils";
import { sanitize } from "~utils/key-sanitizer";
import {S3Service} from "~utils/s3-service";

export const handler = async (event) => {
  const { fileName, bucketName } = HttpEvent.extractQueryParams(event);
  const s3Service = new S3Service();
  const result = await s3Service.getSignedS3Url(bucketName, sanitize(fileName));
  return HttpResponse.success({url: result});
}
