import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid4 } from 'uuid';

Injectable();
export class UploadFile {
  constructor(private config: ConfigService) {}
  
  async uploadFile(
    imageBuffer: Buffer,
    filename: string,
  ) {
    const s3 = new S3();
    return await s3
      .upload({
        Bucket: this.config.get('AWS_BUCKET_NAME'),
        Key: `products/${uuid4()}-${filename}`,
        Body: imageBuffer,
      })
      .promise()
      .then((data) => {
        return data.Location;
      });
  }
}
