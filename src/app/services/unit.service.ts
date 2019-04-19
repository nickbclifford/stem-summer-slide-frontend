import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question.service';
import { options } from '../common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UnitService {

	constructor(private http: HttpClient) { }

	getAllUnits() {
		return this.http.get<SimpleUnit[]>(
			environment.backendURL + '/unit',
			options
		);
	}

	getUnit(id: number) {
		return this.http.get<Unit>(
			environment.backendURL + '/unit/' + id,
			options
		);
	}

	saveUnit(id: number, title: string, description: string, questionIds: number[]) {
		return this.http.put(
			environment.backendURL + '/unit/' + id,
			{ title, description, questionIds },
			options
		);
	}

}

export interface SimpleUnit {
	id: number;
	title: string;
	description: string;
	questions: Array<Pick<Question, 'id' | 'questionType'>>;
}

export interface Unit extends SimpleUnit {
	questions: Question[];
}
