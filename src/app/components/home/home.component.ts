import { Component, OnInit } from '@angular/core';
import { Unit, UnitService } from '../../services/unit.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	units: Unit[] = [];

	constructor(private unitService: UnitService) { }

	ngOnInit() {
		// async pipe is being weird for some reason so we're doing it here instead
		this.unitService.getAllUnits().subscribe(units => {
			console.log(units);
			this.units = units;
		});
	}

	handleUnit(unit: Unit) {
		// TODO
		console.log(unit);
	}

}
