import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerFormat, Question, QuestionService } from '../../services/question.service';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { ErrorStateMatcher } from '@angular/material';
import { CrossFieldErrorMatcher } from '../../common/cross-field-error-matcher';
import { AnswerService } from '../../services/answer.service';

type SubmissionState = 'unsubmitted' | 'loading' | 'submitted';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss'],
	providers: [
		{ provide: ErrorStateMatcher, useClass: CrossFieldErrorMatcher }
	]
})
export class QuestionComponent implements OnInit {

	question!: Question;
	formats = AnswerFormat;
	submissionState: SubmissionState = 'unsubmitted';

	submissionForm = new FormGroup({
		[AnswerFormat.TEXT]: new FormControl(''),
		[AnswerFormat.NUMERICAL]: new FormControl(''),
		[AnswerFormat.IMAGE]: new FormControl('')
	}, onlyOneRequiredValidator);

	constructor(
		private route: ActivatedRoute,
		private questionService: QuestionService,
		private answerService: AnswerService
	) { }

	ngOnInit() {
		this.route.paramMap.pipe(
			switchMap(params => {
				// TODO: Handle null case?
				// I'm pretty sure this will never be null, since iirc Angular routing will throw a fit if there's no param provided
				// But maybe it won't, idk, we'll see
				const id = params.get('id')!;
				return this.questionService.getQuestion(parseInt(id, 10));
			})
		).subscribe(question => {
			// Sorts in place cause JS is gross
			question.answers.sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());

			this.question = question;
		});
	}

	onSubmit() {
		const value = Object.values(this.submissionForm.controls).map<string | number | FileInput>(c => c.value).filter(c => c !== '')[0];

		console.log(value);

		this.submissionState = 'loading';

		let submit: string | File[];

		if (value instanceof FileInput) {
			submit = value.files;
		} else {
			submit = value.toString();
		}

		this.answerService.submitAnswer(this.question.id, submit).subscribe(
			() => this.submissionState = 'submitted',
			() => this.submissionState = 'unsubmitted'
		);
	}

}

const onlyOneRequiredValidator: ValidatorFn = control => {
	const count = Object.values((control as FormGroup).value).filter(c => c !== '' && c !== null).length;

	// There should only ever be one control with a value
	// If for some reason there's more than one (which should never happen anyway), that's still invalid
	if (count === 1) {
		return null;
	}
	return { invalid: true };
};
