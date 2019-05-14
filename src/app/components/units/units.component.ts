import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { UnitDialogComponent } from '../unit-dialog/unit-dialog.component';

@Component({
	selector: 'app-units',
	templateUrl: './units.component.html',
	styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

	constructor(
		private unitService: UnitService,
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		this.route.paramMap.pipe(
			switchMap(params => {
				const idParam = params.get('id');
				if (idParam === null) { return of(null); }
				const id = parseInt(idParam, 10);
				if (isNaN(id)) { return of(null); }

				// TODO: Maybe figure out a way to flatten this pipeline
				return this.unitService.units$.pipe(
					map(units => units.find(u => u.id === id))
				);
			})
		).subscribe(unit => {
			if (unit) {
				const dialogRef = this.dialog.open(UnitDialogComponent, {
					data: unit,
					width: '20em'
				});
				dialogRef.afterClosed().subscribe((navigatedAway: boolean) => {
					if (!navigatedAway) {
						this.router.navigate(['/units']);
					}
				});
			}
		});
	}

}
