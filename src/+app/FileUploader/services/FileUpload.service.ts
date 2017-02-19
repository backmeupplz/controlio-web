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
}
