import { Component, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
	selector: 'svg-icon',
	styles: [ ':host { display:inline-block; width: 13px; }' ],
	template: '<ng-content></ng-content>'
})

export class SvgIconComponent implements OnInit {
	@Input() src:string;

	constructor(private element:ElementRef, private renderer:Renderer, private http:Http) {
	}

	ngOnInit() {
		this.loadSvg();
	}

	private loadSvg() {
		this.http.get( this.src )
			.map( (res: Response) => res.text() )
			.subscribe(
				data => {
					console.log("SVG", this.src)
					const div = document.createElement('DIV');
					div.innerHTML = data;
					const svg = <SVGElement>div.querySelector('svg');
					this.setSvg(svg);
				},
				err => { console.error(err); }
			);
	}

	private setSvg(svg:SVGElement) {
		const elem = this.element.nativeElement;
		elem.innerHTML = '';
		this.renderer.projectNodes(elem, [svg]);
	}

}