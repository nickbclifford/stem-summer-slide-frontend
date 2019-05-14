import { Component, Input, OnInit } from '@angular/core';
import { AnswerFormat, QuestionInput, QuestionService, QuestionType, QuestionWithCorrectAnswer } from '../../../services/question.service';
import { SimpleUnit, UnitService } from '../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { pickProps } from '../../../common/utils';

@Component({
	selector: 'app-admin-questions',
	templateUrl: './admin-questions.component.html',
	styleUrls: ['./admin-questions.component.scss', '../admin.shared.scss']
})
export class AdminQuestionsComponent implements OnInit {

	@Input() id: number | null = null;

	selectedQuestion: QuestionInput | null = null;

	unitId: number | null = null;
	units: SimpleUnit[] = [];

	questionForm = new FormGroup({
		body: new FormControl('', Validators.required),
		questionType: new FormControl(QuestionType.SCIENCE, Validators.required),
		answerFormat: new FormControl(AnswerFormat.TEXT, Validators.required),
		maxPoints: new FormControl(0, Validators.required),
		correctAnswer: new FormControl(null)
	});
	fc = this.questionForm.controls;

	types: QuestionType[] = Object.values(QuestionType);
	allFormats: AnswerFormat[] = Object.values(AnswerFormat);
	formats = AnswerFormat;

	constructor(private questionService: QuestionService, private unitService: UnitService, private location: Location) { }

	ngOnInit() {
		this.updateUnits();
		if (this.id) {
			this.selectQuestion(this.id);
		}

		this.fc.answerFormat.valueChanges.subscribe(format => {
			if (format !== AnswerFormat.NUMERICAL) {
				this.fc.correctAnswer.setValue(null);
			}
		});
	}

	selectQuestion(id: number) {
		this.questionService.getQuestion(id).subscribe(q => {
			this.selectedQuestion = q as QuestionWithCorrectAnswer;
			this.updateForm();
			this.location.go(`/admin/questions/${id}`);
			this.unitId = q.unitId;
		});
	}

	newQuestion() {
		this.selectedQuestion = {
			body: '',
			questionType: QuestionType.SCIENCE,
			answerFormat: AnswerFormat.TEXT,
			unitId: this.unitId!,
			maxPoints: 0,
			correctAnswer: null
		};
		this.updateForm();
	}

	save() {
		// TODO
		console.log(this.questionForm.value);
	}

	updateUnits() {
		this.unitService.getAllUnits().subscribe(u => this.units = u);
	}

	get questions() {
		const unit = this.units.find(u => u.id === this.unitId);
		if (!unit) { return unit; }

		return unit.questions;
	}

	updateForm() {
		this.questionForm.setValue(
			// Shouldn't need the type assertion here, not sure why it's complaining
			pickProps(this.selectedQuestion!, ['body', 'questionType', 'answerFormat', 'maxPoints', 'correctAnswer'] as Array<keyof QuestionInput>)
		);
		this.questionForm.markAsPristine();
	}

}
