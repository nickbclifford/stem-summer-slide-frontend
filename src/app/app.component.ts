import { Component, OnInit } from '@angular/core';
import { UnitService } from './services/unit.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(private unitService: UnitService) { }

	ngOnInit() {
		this.unitService.refreshUnits().subscribe();
	}

}
