import { Component, Input } from '@angular/core';
import { UserService } from '../users/user.service';
import { AppSettings } from '../app-settings';
import { AppModalCenter } from '../helpers/modal-center.component';
import { BucketService } from '../bucket/bucket.service';

@Component({
  styles: [`
    .common-block.managers, .managers-top {
       width: 100%;
    }

    .managers-top {
      margin-top: 35px;
      margin-bottom: 6px;
      display: inline-flex;
    }

    .common-block.managers {
      margin-bottom: 12px;
    }

    .common-block.managers .author {
      padding: 0;
    }

    .common-block.managers > div {
      display: flex;
    }

    .common-block.managers img.icon {
      display: block;
      margin: 0 auto;
    }

    .common-block.managers .author .photo-mini {
      border-radius: 3px 0 0 3px;
      border-width: 0;
    }

    .common-block.managers .align {
      line-height: 60px;
    }

    .cbutton.managers {
      margin: 12px 0;
      float: right;
    }
  `],
  selector: 'projects',
  template: require('./template.pug')
})

export class Managers {
  componentName: "Managers";

  public defaultImage: string = AppSettings.DEFAUL_IMG;
  private managers: any = [];
  constructor(
    private userService: UserService,
    private bucket: BucketService
  ){}


  openModal(){
    //this.modalcenter.openModal( AppModalCenter.MODAL.SignUpModal );
    //this.appModalCenter.openModal( AppModalCenter.MODAL.SignUpModal );
  }

  ngOnInit() {

    this.userService.getAuthUsers().subscribe((result) => {
        this.managers = result;
    }, (err)=>{
      console.log( "Error", err )
    });

  }
}
