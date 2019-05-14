import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Unit } from '../../services/unit.service';
import { Question, QuestionType } from '../../services/question.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
	selector: 'app-unit-dialog',
	templateUrl: './unit-dialog.component.html',
	styleUrls: ['./unit-dialog.component.scss']
})
export class UnitDialogComponent implements OnInit {

	types: QuestionType[] = Object.values(QuestionType);

	constructor(
		private dialogRef: MatDialogRef<UnitDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private unit: Unit,
		private router: Router
	) {	}

	ngOnInit() {
		console.log(this.unit);
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.dialogRef.close(true);
			}
		});
	}

	getFullQuestion(type: QuestionType) {
		return this.unit.questions.find(q => q.questionType === type);
	}

	getIconClass(question: Question | undefined) {
		if (!question) {
			return 'fa-times-circle';
		}
		return QUESTION_TYPE_ICONS[question.questionType];
	}

}

export const QUESTION_TYPE_ICONS: Record<QuestionType, string> = {
	[QuestionType.SCIENCE]: 'fa-flask',
	[QuestionType.TECHNOLOGY]: 'fa-desktop',
	[QuestionType.ENGINEERING]: 'fa-cogs',
	[QuestionType.MATHEMATICS]: 'fa-calculator'
};
