import { Injectable } from '@angular/core';
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

  store_data( key: string, data: any, callback: any ) {
    //let array = data.Body;
    //let base64Data = btoa(String.fromCharCode.apply(null, array));
    //let image = document.createElement('img');
    //image.src = 'data:image/png;base64,' + base64Data;
    //localStorage.setItem( key, image.src );
    callback(null, data);
  }

  getCachedImg( key: string ){
    // const imgSrc = localStorage.getItem(key);
    // if( imgSrc ){
    //   return imgSrc;
    // } else {
      return null;
    //}
  }


  uploadImage( key, file, callback ){
    let self = this;
    if( callback != undefined && callback != null && key.length > 0 && file != undefined ){
      console.log( file );
      fs.readFile(file.path, function (err, dataFile) {
      if (err) throw err; // Something went wrong!

        var params = {Key: key, Body: dataFile};
        self.bucket.upload(params, function (err, data) {

          // Whether there is an error or not, delete the temp file
          fs.unlink(file.path, function (err) {
              if (err) {
                  console.error(err);
              }
          });

          console.log(err, data);

          if( !err ) callback(null, data);
          else callback(err, null);
        });
      });
    }
  }

  getImage( key, callback ){
    if( callback != undefined && callback != null && key.length > 0 ){
    let self = this;
    this.s3.getObject(
      { Bucket: this.bucketName, Key: key },
      function (error, data) {
        if (error != null) {
          console.error("Failed to retrieve an object: " + error, data );
          callback(error, null);
        } else {
          console.log("вызов store_data");
          self.store_data( key, data, callback );
        }
      });
    }
  }

}
