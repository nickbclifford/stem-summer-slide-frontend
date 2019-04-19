import { Component, OnInit } from '@angular/core';
import { SimpleUnit, UnitService } from '../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-admin-units',
	templateUrl: './admin-units.component.html',
	styleUrls: ['./admin-units.component.scss']
})
export class AdminUnitsComponent implements OnInit {

	units: SimpleUnit[] = [];

	selectedUnit: SimpleUnit | null = null;

	unitForm = new FormGroup({
		title: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required)
	});

	fc = this.unitForm.controls;

	constructor(private unitService: UnitService) { }

	ngOnInit() {
		this.unitService.getAllUnits().subscribe(units => this.units = units);
	}

}
