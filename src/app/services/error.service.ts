import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorResponse } from '../common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	readonly handleErrorOperator = catchError<any, never>(this.handleRequestError.bind(this));

	constructor(private snackBar: MatSnackBar) { }

	handleRequestError(error: HttpErrorResponse) {
		let errorReason = 'An unknown error occurred. Try again later.';
		if (error.error instanceof ErrorEvent) {
			errorReason = `There was a problem communicating with our servers. (${error.error.message})`;
		} else {
			errorReason = (error.error as ErrorResponse).error;
		}

		this.errorSnackBar(errorReason);
		return throwError(errorReason);
	}

	errorSnackBar(message: string) {
		this.snackBar.open(`Error: ${message}`, 'Dismiss');
	}

}
