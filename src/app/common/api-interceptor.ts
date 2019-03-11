import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { map } from 'rxjs/operators';
import { DataResponse } from './http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class APIInterceptor implements HttpInterceptor {

	constructor(private errorService: ErrorService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!req.url.startsWith(environment.backendURL)) {
			// If the requests aren't going to us, don't bother with the pipeline
			return next.handle(req);
		}

		return next.handle(req).pipe(
			map(event => {
				if (event instanceof HttpResponse) {
					// ErrorResponse case is already handled by the handler operator
					const apiEvent: HttpResponse<DataResponse<any>> = event;
					event = apiEvent.clone({
						body: apiEvent.body!.data
					});
				}

				return event;
			}),
			this.errorService.handleErrorOperator
		);
	}

}
