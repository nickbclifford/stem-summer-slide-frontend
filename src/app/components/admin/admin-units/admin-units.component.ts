import { Component, Input, OnInit } from '@angular/core';
import { SimpleUnit, UnitService } from '../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
	selector: 'app-admin-units',
	templateUrl: './admin-units.component.html',
	styleUrls: ['./admin-units.component.scss', '../admin.shared.scss']
})
export class AdminUnitsComponent implements OnInit {

	@Input() id: number | null = null;

	units: SimpleUnit[] = [];

	selectedUnit: SimpleUnit | null = null;

	unitForm = new FormGroup({
		title: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required)
	});

	fc = this.unitForm.controls;

	constructor(private unitService: UnitService, private snackBar: MatSnackBar, private location: Location) { }

	ngOnInit() {
		this.unitService.units$.subscribe(units => {
			this.units = units;
			if (this.id) {
				const unit = this.units.find(u => u.id === this.id);
				if (unit) {
					this.selectUnit(unit);
				}
			}
		});
	}

	selectUnit(unit: SimpleUnit) {
		this.selectedUnit = unit;
		this.unitForm.setValue({ title: unit.title, description: unit.description });
		this.unitForm.markAsPristine();
		this.location.go(`/admin/units/${unit.id}`);
	}

	newUnit() {
		this.selectUnit({
			id: Math.max(...this.units.map(u => u.id)) + 1,
			title: '',
			description: '',
			questions: []
		});
	}

	save() {
		const { id, questions } = this.selectedUnit!;
		const { title, description } = this.unitForm.value;
		this.unitService.saveUnit(id, title, description, questions.map(q => q.id)).subscribe(() => {
			this.snackBar.open('Successfully saved unit!', 'Dismiss');
			this.unitService.refreshUnits().subscribe();
		});
	}
}
