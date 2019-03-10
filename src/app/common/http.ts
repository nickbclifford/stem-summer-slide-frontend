import { HttpHeaders } from '@angular/common/http';

export const options = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

export interface DataResponse<T> { error: null; data: T; }
export interface ErrorResponse { error: string; data: null; }
export type APIResponse<T> = DataResponse<T> | ErrorResponse;
