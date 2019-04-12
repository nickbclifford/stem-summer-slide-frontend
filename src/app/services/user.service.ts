import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { options } from '../common/http';
import { Possibly } from '../common/types';
import { Question } from './question.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	// User if logged in, null if logged out, undefined if pending.
	$ = new BehaviorSubject<Possibly<User>>(undefined);

	constructor(private http: HttpClient, private authService: AuthService) {
		this.authService.$.pipe(
			switchMap(jwt => {
				if (jwt) {
					return this.getUser();
				}
				return of(jwt);
			})
		).subscribe(user => {
			this.$.next(user);
		});
	}

	getUser() {
		return this.http.get<User>(
			environment.backendURL + '/user',
			options
		);
	}

	getNextQuestion() {
		return this.http.get<{ nextQuestion: NextQuestion | null }>(
			environment.backendURL + '/user/next-question',
			options
		).pipe(
			map(r => r.nextQuestion)
		);
	}

}

export type NextQuestion = Pick<Question, 'id' | 'questionType' | 'unitId'>;

export interface User {
	id: number;
	admin: boolean;
	email: string;
	confirmed: boolean;
	name: string;
}
