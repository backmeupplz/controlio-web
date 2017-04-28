const AWS = require('aws-sdk');
import * as fs from 'fs';

export class BucketService {
  private identy: string = "us-east-1:16327515-a666-4f4b-b7b9-d7c831b285c0";
  private region: string = "us-east-1";
  private bucketName: string = 'controlio';
  private bucket: any;
  private s3: any;

  constructor(){
    let AWSService = AWS;
    let paramsCre = {
      IdentityPoolId: this.identy
    };

    let credentials = new AWSService.CognitoIdentityCredentials(paramsCre);

    AWSService.config.update({
      "credentials": credentials,
      "region": this.region
    });

    this.bucket = new AWSService.S3({params: {Bucket: this.bucketName }});
    this.s3 = new AWSService.S3();
  }

  uploadImage( key, file, callback ){
    let self = this;
    if( callback != undefined && callback != null && key.length > 0 && file != undefined ){
      var params = {Key: key, Body: file};
      self.bucket.upload(params, function (err, data) {
        if( !err ) callback(null, data);
        else callback(err, null);
      });
    }
  }

  getImage( key, callback ){
    if( callback != undefined && callback != null && key.length > 0 ){
      this.s3.getObject(
      {
        Bucket: this.bucketName,
        Key: key,
      },
      function (error, data) {
        if (error != null) {
          callback(error, null);
        } else {
          callback(null, data)
        }
      });
    }
  }
}
