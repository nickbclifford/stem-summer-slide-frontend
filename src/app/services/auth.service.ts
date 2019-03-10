import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { options } from '../common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { JWT_STORAGE_KEY, retrieveJWT } from '../common/auth';
import { BehaviorSubject } from 'rxjs';
import { Possibly } from '../common/types';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// AuthState if logged in, null if logged out, undefined if pending.
	$ = new BehaviorSubject<Possibly<AuthState>>(undefined);

	constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
		this.updateAuthState();
	}

	login(email: string, password: string) {
		return this.http.post<LoginResponse>(
			environment.backendURL + '/auth/login',
			{ email, password },
			options
		).pipe(
			map(({ token }) => {
				localStorage.setItem(JWT_STORAGE_KEY, token);
				this.updateAuthState();
				return token;
			})
		);
	}

	logout() {
		localStorage.removeItem(JWT_STORAGE_KEY);
		this.updateAuthState();
	}

	register(name: string, email: string, password: string) {
		return this.http.post(
			environment.backendURL + '/auth/register',
			{ name, email, password },
			options
		);
	}

	confirm(user: number, hash: string) {
		return this.http.post(
			environment.backendURL + '/auth/confirm',
			{ user, hash },
			options
		);
	}

	private updateAuthState() {
		const jwt = retrieveJWT();
		if (jwt === null) {
			this.$.next(null);
		} else {
			const { user, admin }: JWTPayload = this.jwtHelper.decodeToken(jwt);
			this.$.next({ user, admin });
		}
	}

}

interface LoginResponse {
	token: string;
}

interface JWTPayload {
	user: number;
	admin: boolean;
	iat: number;
	exp: number;
}

export interface AuthState {
	user: number;
	admin: boolean;
}
