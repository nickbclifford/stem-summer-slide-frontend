import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerFormat, Question, QuestionService } from '../../services/question.service';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { ErrorStateMatcher } from '@angular/material';
import { CrossFieldErrorMatcher } from '../../common/cross-field-error-matcher';

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

	submissionForm = new FormGroup({
		[AnswerFormat.TEXT]: new FormControl(''),
		[AnswerFormat.NUMERICAL]: new FormControl(''),
		[AnswerFormat.IMAGE]: new FormControl('')
	}, onlyOneRequiredValidator);

	constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

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
			this.question = question;
		});
	}

	onSubmit() {
		// TODO
		const value = Object.values(this.submissionForm.controls).map<string | FileInput>(c => c.value).filter(c => c !== '')[0];

		console.log(`form value: ${value}`);
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
