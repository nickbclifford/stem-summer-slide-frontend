import { Component, OnInit } from '@angular/core';
import { SimpleUnit, UnitService } from '../../../services/unit.service';

@Component({
	selector: 'app-admin-units',
	templateUrl: './admin-units.component.html',
	styleUrls: ['./admin-units.component.scss']
})
export class AdminUnitsComponent implements OnInit {

	units: SimpleUnit[] = [];

	selectedUnit: SimpleUnit | null = null;

	constructor(private unitService: UnitService) { }

	ngOnInit() {
		this.unitService.getAllUnits().subscribe(units => this.units = units);
	}

}
