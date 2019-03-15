import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Unit } from '../../services/unit.service';
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

	getIconClass(type: QuestionType) {
		return QUESTION_TYPE_ICONS[type];
	}

}

export const QUESTION_TYPE_ICONS: Record<QuestionType, string> = {
	[QuestionType.SCIENCE]: 'fa-flask',
	[QuestionType.TECHNOLOGY]: 'fa-desktop',
	[QuestionType.ENGINEERING]: 'fa-cogs',
	[QuestionType.MATHEMATICS]: 'fa-calculator'
};
