import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Unit, UnitService } from '../../services/unit.service';
import { QuestionType } from '../../services/question.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
	selector: 'app-unit',
	templateUrl: './unit.component.html',
	styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

	types: QuestionType[] = Object.values(QuestionType);

	constructor(
		private unitService: UnitService,
		private dialogRef: MatDialogRef<UnitComponent>,
		@Inject(MAT_DIALOG_DATA) private unit: Unit,
		private router: Router
	) {	}

	ngOnInit() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.dialogRef.close(true);
			}
		});
	}

	getFullQuestion(type: QuestionType) {
		return this.unit.questions.find(q => q.questionType === type);
	}

}
