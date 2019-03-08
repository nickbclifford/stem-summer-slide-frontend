import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError, options } from '../common/http';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	// User if logged in, null if logged out, undefined if pending.
	$ = new BehaviorSubject<User | null | undefined>(undefined);

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
		).pipe(catchError(handleError));
	}

}

export interface User {
	id: number;
	admin: boolean;
	email: string;
	confirmed: boolean;
	name: string;
}
