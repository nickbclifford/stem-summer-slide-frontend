import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question.service';
import { options } from '../common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UnitService {

	units$ = new BehaviorSubject<SimpleUnit[]>([]);

	constructor(private http: HttpClient) { }

	refreshUnits() {
		return this.http.get<SimpleUnit[]>(
			environment.backendURL + '/unit',
			options
		).pipe(
			tap(u => this.units$.next(u))
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
