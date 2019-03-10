import { Injectable } from '@angular/core';
import { Answer } from './answer.service';
import { HttpClient } from '@angular/common/http';
import { Omit } from '../common/types';
import { options } from '../common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class QuestionService {

	constructor(private http: HttpClient) { }

	newQuestion(question: Omit<Question, 'id'>) {
		return this.http.post<{ id: number }>(
			environment.backendURL + '/question',
			question,
			options
		);
	}

	getQuestion(id: number) {
		return this.http.get<Question>(
			environment.backendURL + '/question/' + id
		);
	}

	modifyQuestion(id: number, questionProps: Partial<Omit<QuestionWithCorrectAnswer, 'id'>>) {
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
}

export interface QuestionWithCorrectAnswer extends Question {
	correctAnswer: number | null;
}

export interface QuestionWithAnswers extends QuestionWithCorrectAnswer {
	answers: Answer[];
}
