import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleError, options } from '../common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AnswerService {

	constructor(private http: HttpClient) { }

	submitAnswer(questionId: number, content: string) {
		return this.http.post<{ id: number }>(
			environment.backendURL + '/answer',
			{ questionId, content },
			options
		).pipe(catchError(handleError));
	}

	getAnswer(id: number) {
		return this.http.get<Answer>(
			environment.backendURL + '/answer/' + id,
			options
		).pipe(catchError(handleError));
	}

}

export interface Answer {
	id: number;
	content: string;
	points: number | null;
	userId: number;
	questionId: number;
}
