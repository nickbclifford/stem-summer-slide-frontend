import { Component, Input, OnInit } from '@angular/core';
import { SimpleUnit, UnitService } from '../../../services/unit.service';
import { Answer, AnswerService } from '../../../services/answer.service';
import { AnswerFormat, Question, QuestionService, QuestionWithCorrectAnswer } from '../../../services/question.service';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-admin-answers',
	templateUrl: './admin-answers.component.html',
	styleUrls: ['./admin-answers.component.scss', '../admin.shared.scss']
})
export class AdminAnswersComponent implements OnInit {

	@Input() id: number | null = null;

	units: SimpleUnit[] = [];
	private _unitId: number | null = null;

	private _questionId: number | null = null;
	selectedQuestion: QuestionWithCorrectAnswer | null = null;

	selectedAnswer: Answer | null = null;

	onlyShowUngraded = false;

	newGrade = new FormControl('', [
		Validators.required,
		Validators.min(0),
		c => this.selectedQuestion ? Validators.max(this.selectedQuestion.maxPoints)(c) : null
	]);

	formats = AnswerFormat;

	constructor(
		private unitService: UnitService,
		private questionService: QuestionService,
		private answerService: AnswerService,
		private location: Location
	) { }

	ngOnInit() {
		this.unitService.units$.subscribe(u => this.units = u);

		if (this.id) {
			this.selectAnswer(this.id);
		}
	}

	selectAnswer(id: number) {
		this.answerService.getAnswer(id).pipe(
			switchMap(a => this.updateQuestion(a.questionId).pipe(map(() => a)))
		).subscribe(a => {
			this.selectedAnswer = a;
			this.location.go(`/admin/answers/${id}`);
		});
	}

	get questions() {
		const unit = this.units.find(u => u.id === this.unitId);
		if (!unit) { return unit; }

		return unit.questions;
	}

	get answers(): Answer[] {
		if (!this.selectedQuestion) { return []; }

		if (this.onlyShowUngraded) {
			return this.selectedQuestion.answers.filter(a => a.points === null);
		}

		return this.selectedQuestion.answers;
	}

	get unitId() {
		return this._unitId;
	}

	set unitId(id: number | null) {
		if (id) {
			this.location.go('/admin/answers');
			this.selectedAnswer = null;
		}

		this._unitId = id;
		this.selectedQuestion = null;
	}

	get questionId() {
		return this._questionId;
	}

	set questionId(id: number | null) {
		this.updateQuestion(id).subscribe(() => {
			if (id) {
				this.location.go('/admin/answers');
				this.selectedAnswer = null;
			}
		});
	}

	updateQuestion(id: number | null): Observable<Question | null> {
		this._questionId = id;

		if (id) {
			return this.questionService.getQuestion(id).pipe(tap(q => {
				if (!this.unitId) {
					this.unitId = q.unitId;
				}
				this.selectedQuestion = q as QuestionWithCorrectAnswer;
			}));
		}

		return of(null);
	}

	changeGrade() {
		this.answerService.gradeAnswer(this.selectedAnswer!.id, this.newGrade.value).subscribe(() => {
			this.selectAnswer(this.selectedAnswer!.id);
		});
	}

}
