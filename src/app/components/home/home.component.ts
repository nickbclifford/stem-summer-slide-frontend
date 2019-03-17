import { Component, OnInit } from '@angular/core';
import { Unit, UnitService } from '../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { UnitComponent } from '../unit/unit.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	units: Unit[] = [];
	currentUnit: Unit | null = null;

	constructor(
		private unitService: UnitService,
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		this.unitService.getAllUnits().subscribe(units => this.units = units);

		this.route.paramMap.pipe(
			switchMap(params => {
				const id = params.get('id');
				if (id === null) {
					return of(null);
				} else {
					return this.unitService.getUnit(parseInt(id, 10));
				}
			})
		).subscribe(unit => {
			this.currentUnit = unit;
			if (unit !== null) {
				this.handleUnit(unit);
			}
		});
	}

	handleUnit(unit: Unit) {
		if (this.currentUnit === null) {
			this.router.navigate(['/home', unit.id]);
		} else {
			const dialogRef = this.dialog.open(UnitComponent, {
				data: unit,
				width: '20em'
			});
			dialogRef.afterClosed().subscribe((navigatedAway: boolean) => {
				if (!navigatedAway) {
					this.router.navigate(['/home']);
				}
			});
		}
	}

}
