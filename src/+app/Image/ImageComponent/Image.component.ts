import { Component, OnInit, Input } from '@angular/core';
import { AbstractImageModel } from '../AbstractImage.model';

@Component({
  styles: [`
    :host img {
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  `],
  selector: 'cn-image',
  templateUrl: require('./image.component.pug')
})
export class ImageComponent implements OnInit {
  @Input() capImage: string = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAyMCAxOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5jYW1lcmEtYWx0PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9InByb2plY3RfZGV0YWlsc19tYW5hZ2VyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJwcm9qZWN0X2RldGFpbHNfZWRpdF9tZXNzYWdlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTkyLjAwMDAwMCwgLTI3NC4wMDAwMDApIiBmaWxsPSIjQTNBREJCIj4gICAgICAgICAgICA8ZyBpZD0ibXNnLWNvcHktMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDcwLjAwMDAwMCwgMjAyLjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8ZyBpZD0ibWVzc2FnZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCA1NC4wMDAwMDApIj4gICAgICAgICAgICAgICAgICAgIDxnIGlkPSJFTUFJTC0rLVJlY3RhbmdsZS02MzktKy1Zb3VyLWVtYWlsLUNvcHktMyI+ICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9ImNhbWVyYS1hbHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwMi4wMDAwMDAsIDE4LjAwMDAwMCkiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iMTAuMiIgY3k9IjEwLjIiIHI9IjMuMiI+PC9jaXJjbGU+ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03LDAgTDUuMiwyIEwyLDIgQzAuOSwyIDAsMi45IDAsNCBMMCwxNiBDMCwxNy4xIDAuOSwxOCAyLDE4IEwxOCwxOCBDMTkuMSwxOCAyMCwxNy4xIDIwLDE2IEwyMCw0IEMyMCwyLjkgMTkuMSwyIDE4LDIgTDE0LjgsMiBMMTMsMCBMNywwIEw3LDAgWiBNMTAsMTUgQzcuMiwxNSA1LDEyLjggNSwxMCBDNSw3LjIgNy4yLDUgMTAsNSBDMTIuOCw1IDE1LDcuMiAxNSwxMCBDMTUsMTIuOCAxMi44LDE1IDEwLDE1IEwxMCwxNSBaIiBpZD0iU2hhcGUiPjwvcGF0aD4gICAgICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4="
  @Input() image: AbstractImageModel;
  constructor() {}
  ngOnInit() {}
}