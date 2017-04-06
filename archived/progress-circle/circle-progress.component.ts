import {Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, NgZone} from '@angular/core';

@Component({
  styles: [`
    :host {
      display: flex;
    }
  `],
  selector: 'circle-progress',
  templateUrl: 'circle-progress.html',
})
export class CircleProgressComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef, private zone: NgZone){}
  start(percent:number){
    this.startProgress(percent)
  }

  startProgress(percent){
    if( this._percent < percent ){
      setTimeout(()=> {
        this._percent++;
        this.angle = this.percToAngle(this._percent);
        this.radian = this.angleToRad(this.angle);
        this.setArcSet(this.angle);
        this.setColor(this._percent);
        this.circleText = this._percent + '%';
        this.calculateAngle(this.radius, this.radian);
        this.ref.detectChanges();
        this.startProgress(percent);
      }, 20);
    }
  }
  private _percent:number = 0;
  @Input()
  set percent(percent:number){
    this.startProgress(percent)
  }
  get percent(){
    return this._percent;
  }

  @Input() boxSize:number = 200;
  @Input() radius:number = 0.9*this.boxSize ;
  @Input() time:number = 0;
  @Input() border:number = 20;
  @Input() color:string = '#b0a4fd';
  @Input() backgroundColor:string = 'white';

  @Input() lowColor:string = this.color;
  @Input() middleColor:string = this.color;
  @Input() interColor:string = this.color;
  @Input() highColor:string = this.color;

  @Input() fontColor:string = 'black';
  @Input() fontSize: number = 12;
  @Input() fontFamily:string = 'Times New Roman';
  @Input() fontX:string = '50%';
  @Input() fontY:string = '55%';
  @Input() textHidden: boolean = false;

  @Input() innerFill:string = "white";
  @Input() textAnchor:string = "middle";


  angle:number;
  radian:number;
  cx:number;
  cy:number;

  x0:number;
  y0:number;
  rx:number;
  ry:number;

  innerRadius:number;
  circleText:string = '0%';

  x;
  y;

  arcSweep;
  circleM;
  circleL;
  circleA;
  circleEnd;



  canAnimate:boolean = true;

  ngOnInit() {
    this.setInputs();
    this.calculateAll();
  }

  ngOnChanges(){
    this.setInputs();
    this.calculateAll();
  }

  private setInputs() {

    if(this._percent <0){
      this._percent *= -1;
    }

    if(this.time == 0){
      this.circleText = this._percent+'%';
      this.setColor(this._percent);
      this.angle = this.percToAngle(this._percent);
    }else{
      this.angle = 0;
    }

    this.radian = this.angleToRad(this.angle);

    this.cx = this.boxSize / 2;
    this.cy = this.boxSize / 2;


    this.x0 = this.cx;
    this.y0 = this.cy - this.radius;

    this.rx = this.ry = this.radius;

    this.innerRadius = this.radius - this.border;

  }

  private calculateAll() {
    this.calculateAngle(this.radius, this.radian);
    this.setArcSet(this.angle);
    this.circleM = this.createArgument('M', this.cx, this.cy);
    this.circleL = this.createArgument('L', this.x0, this.y0);
    this.circleA = this.createArgument('A', this.rx, this.ry);
  }

  private calculateAngle(r, rad) {
    this.x = this.cx + r * Math.sin(rad);
    this.y = this.cy - r * Math.cos(rad);

    if (this._percent == 100) {
      this.x--;
    }

    this.circleEnd = this.createArgument(null, this.x, this.y);
  }

  private setArcSet(angle) {
    if (Math.round(angle) <= 180) {
      this.arcSweep = this.createArgument(null, 0, 1);
    } else if (Math.round(angle) > 180) {
      this.arcSweep = this.createArgument(null, 1, 1);
    }
  }

  private createArgument(prefix:string, val1:number, val2:number) {

    if (prefix != null) {
      return prefix + val1 + ',' + val2 + ' ';
    } else {
      return val1 + ',' + val2 + ' ';
    }

  }

  private percToAngle(perc:number){
    return perc*3.6;
  }


  private angleToRad(angle) {
    return (angle * Math.PI) / 180;
  }

  public animate() {
    
    if(this.canAnimate) {
      this.canAnimate = false;
      let time = this.time * 1000 / this._percent;

      this.animationLoop(1, time);

    }else{
      return;
    }

  }

  private animagePercent(i){
    this.angle = this.percToAngle(i);
    this.radian = this.angleToRad(this.angle);
    this.setArcSet(this.angle);
    this.setColor(i);
    this.circleText = i + '%';
    this.calculateAngle(this.radius, this.radian);
  }

  private animationLoop(i, time) {
    //
    if (i <= this._percent) {
      setTimeout(()=> {
        //
        //this.angle = this.percToAngle(i);
        //this.radian = this.angleToRad(this.angle);
        //this.setArcSet(this.angle);
        //this.setColor(i);
        this.circleText = i + '%';
        //;
        //this.calculateAngle(this.radius, this.radian);
        i++;
        //this.ref.detectChanges();
        this.animationLoop(i, time);
      },time)
    }
    if(i >= this._percent){
      this.canAnimate = true;
    }
  }

  private setColor(_percent){
    if(_percent <=25){
      this.color = this.lowColor;
    }else if(_percent <=50){
      this.color = this.middleColor;
    }else if(_percent <=75){
      this.color = this.interColor;
    }else if(_percent >75){
      this.color = this.highColor;
    }
  }

}
