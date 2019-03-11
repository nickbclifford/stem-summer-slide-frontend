import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Unit, UnitService } from '../../services/unit.service';
import { QuestionType } from '../../services/question.service';

@Component({
	selector: 'app-unit',
	templateUrl: './unit.component.html',
	styleUrls: ['./unit.component.scss']
})
export class UnitComponent {

	types: QuestionType[] = Object.values(QuestionType);

	constructor(
		private unitService: UnitService,
		private dialogRef: MatDialogRef<UnitComponent>,
		@Inject(MAT_DIALOG_DATA) private unit: Unit
	) { }

}
