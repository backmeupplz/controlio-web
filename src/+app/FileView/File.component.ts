import { Component, OnInit, Input } from '@angular/core';
import { FileModel } from '../Files/models';
import { FileService } from './File.service';

@Component({
  selector: 'cn-file',
  templateUrl: require('./File.component.pug')
})
export class FIleComponent implements OnInit {
  @Input() file: FileModel;
  constructor(private fileService: FileService) {}
  ngOnInit() {}
}
