import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { options } from '../common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AnswerService {

	constructor(private http: HttpClient) { }

	submitAnswer(questionId: number, content: string | File[]) {
		if (typeof content === 'string') {
			return this.http.post<{ id: number }>(
				environment.backendURL + '/answer',
				{ questionId, content },
				options
			);
		}

		const formData = new FormData();
		formData.append('questionId', questionId.toString());
		for (const image of content) {
			formData.append('images', image);
		}

		return this.http.post<{ id: number }>(
			environment.backendURL + '/answer/image',
			formData,
			{
				headers: new HttpHeaders({
					enctype: 'multipart/form-data'
				})
			}
		);
	}

	getAnswer(id: number) {
		return this.http.get<Answer>(
			environment.backendURL + '/answer/' + id,
			options
		).pipe(
			map(a => {
				// a.submittedAt is actually an ISO timestamp when we get it from the API
				a.submittedAt = new Date(a.submittedAt);
				return a;
			})
		);
	}

	gradeAnswer(id: number, points: number) {
		return this.http.post(
			environment.backendURL + '/answer/grade',
			{ id, points },
			options
		);
	}

}

export interface Answer {
	id: number;
	content: string;
	points: number | null;
	userId: number;
	questionId: number;
	submittedAt: Date;
}
