import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { options } from '../common/http';
import { environment } from '../../environments/environment';

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
		);
	}

}

export interface Answer {
	id: number;
	content: string;
	points: number | null;
	userId: number;
	questionId: number;
}
