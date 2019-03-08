import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export const options = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

export interface DataResponse<T> { error: null; data: T; }
export interface ErrorResponse { error: string; data: null; }
export type APIResponse<T> = DataResponse<T> | ErrorResponse;

export function handleError(error: HttpErrorResponse) {
	let errorReason = 'An unknown error occurred. Try again later.';
	if (error.error instanceof ErrorEvent) {
		errorReason = `There was a problem communicating with our servers. (${error.error.message})`;
	} else {
		errorReason = (error.error as ErrorResponse).error;
	}

	return throwError(errorReason);
}
