import S3 from 'aws-sdk/clients/s3';

export class S3Service {
  private s3;

  constructor() {
    this.s3 = new S3({
      signatureVersion: 'v4'
    });
  }

  getSignedS3Url(bucketName: string, objectKey: string) {
    return this.s3.getSignedUrlPromise('putObject', {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 120
    });
  }

  getItem(bucketName: string, objectKey: string) {
    return this.s3.getObject({
      Bucket: bucketName,
      Key: objectKey
    }).promise();
  }

  deleteItem(bucketName: string, objectKey: string) {
    return this.s3.deleteObject({
      Bucket: bucketName,
      Key: objectKey
    }).promise();
  }

}
