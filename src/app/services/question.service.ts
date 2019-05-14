import { Injectable } from '@angular/core';
import { Answer } from './answer.service';
import { HttpClient } from '@angular/common/http';
import { Omit } from '../common/types';
import { options } from '../common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class QuestionService {

	constructor(private http: HttpClient) { }

	newQuestion(question: QuestionInput) {
		return this.http.post<{ id: number }>(
			environment.backendURL + '/question',
			question,
			options
		);
	}

	getQuestion(id: number) {
		return this.http.get<Question>(
			environment.backendURL + '/question/' + id
		).pipe(
			map(q => {
				for (const answer of q.answers) {
					// answer.submittedAt is actually an ISO timestamp when we get it from the API
					answer.submittedAt = new Date(answer.submittedAt);
				}
				return q;
			})
		);
	}

	saveQuestion(id: number, questionProps: QuestionInput) {
		return this.http.patch(
			environment.backendURL + '/question/' + id,
			questionProps,
			options
		);
	}

}

export enum QuestionType {
	SCIENCE = 'science',
	TECHNOLOGY = 'technology',
	ENGINEERING = 'engineering',
	MATHEMATICS = 'mathematics'
}

export enum AnswerFormat {
	TEXT = 'text',
	IMAGE = 'image',
	NUMERICAL = 'numerical'
}

export interface Question {
	id: number;
	body: string;
	questionType: QuestionType;
	answerFormat: AnswerFormat;
	unitId: number;
	maxPoints: number;
	answers: Answer[];
}

export interface QuestionWithCorrectAnswer extends Question {
	correctAnswer: number | null;
}

export type QuestionInput = Omit<QuestionWithCorrectAnswer, 'id' | 'answers'>;
