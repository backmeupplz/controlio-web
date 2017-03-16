import { Injectable } from '@angular/core';
import { FileModel } from '../../Files/models';
import { Observable } from 'rxjs/Observable';
import { BucketService } from '../../bucket/bucket.service';
import { FileKeyGenService } from './FileKeyGen.service';

@Injectable()
export class FileUploadService {
  constructor(private bucketService: BucketService, private fileKeyGenService: FileKeyGenService) {}

  // Загрузить файл (файлы) по ключу
  // ключ = строка
  // на выходе получаем FileModel или наследников

  loadData(key: string) : Observable<any> {
    return this.bucketService.getImage( key );
  }

  loadFile(key: string) : Observable<FileModel> {
    return this.loadData(key).map((res)=>{
      return new FileModel("","");
    });
  }

  // loadFiles(keys: string[]) : Observable<FileModel[]> {
  //   return this.bucketService.getImage( key ).map((res)=>{
  //     return [new FileModel("","")];
  //   });
  // }

  // Отправить файл (файлы)
  // Передаем файл который является наследников FileModel
  // Получаем ключ





  // uploadGallery( gallery: FilesGalleryModel ){
  //   if(!gallery) return;
  //   gallery.files.forEach((file)=>{
  //     console.log("set upload", file);
  //     if(!file.isUploaded){
  //       file.setLoad();
  //       this.uploadOn(file.key, file.file, file.loadFile, file.loadFileProgress );
  //     }
  //   });
  // }


  // For upload file on server
  // callback (err, res)=>{}
  uploadOn( key: string, file: any, callback: any, callabackUploadProgress?: any ){
    if( callback != undefined && callback != null && key.length > 0 && file != undefined ){
      if( file == undefined || key == undefined ){
        callback( true, null);
        if(callabackUploadProgress) callabackUploadProgress(-1)
      }
      this.bucketService.uploadImage( key, file, callabackUploadProgress ).subscribe((res)=>{
        console.log("callback FileUploadService", new Date())
        callback(null, res);
      }, (err)=>{
        callback(err, null);
      });
    }
  }

}
