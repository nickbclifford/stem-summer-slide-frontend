import { Component, Input, OnInit } from '@angular/core';
import { SimpleUnit, UnitService } from '../../../services/unit.service';
import { Answer, AnswerService } from '../../../services/answer.service';
import { QuestionService } from '../../../services/question.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-admin-answers',
	templateUrl: './admin-answers.component.html',
	styleUrls: ['./admin-answers.component.scss', '../admin.shared.scss']
})
export class AdminAnswersComponent implements OnInit {

	@Input() id: number | null = null;

	units: SimpleUnit[] = [];
	unitId: number | null = null;

	private _questionId: number | null = null;

	private _answers: Answer[] = [];
	selectedAnswer: Answer | null = null;

	onlyShowUngraded = false;

	constructor(
		private unitService: UnitService,
		private questionService: QuestionService,
		private answerService: AnswerService,
		private location: Location
	) { }

	ngOnInit() {
		this.unitService.units$.subscribe(u => this.units = u);

		console.log(this.id);

		if (this.id) {
			this.selectAnswer(this.id);
		}
	}

	selectAnswer(id: number) {
		this.answerService.getAnswer(id).subscribe(a => {
			this.selectedAnswer = a;
			this.location.go(`/admin/answers/${id}`);
			this.questionId = a.questionId;
		});
	}

	get questions() {
		const unit = this.units.find(u => u.id === this.unitId);
		if (!unit) { return unit; }

		return unit.questions;
	}

	get answers() {
		if (this.onlyShowUngraded) {
			return this._answers.filter(a => a.points === null);
		}

		return this._answers;
	}

	get questionId() {
		return this._questionId;
	}

	set questionId(id: number | null) {
		if (id) {
			this.questionService.getQuestion(id).subscribe(q => {
				this._answers = q.answers;
				if (!this.unitId) {
					this.unitId = q.unitId;
				}
			});
		}

		this._questionId = id;
	}

}
