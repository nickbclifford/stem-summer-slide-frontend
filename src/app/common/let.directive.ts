import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// thank you https://medium.com/@AustinMatherne/angular-let-directive-a168d4248138 :pray:

interface LetContext<T> {
	appLet: T | null;
}

@Directive({
	selector: '[appLet]'
})
export class LetDirective<T> {
	private _context: LetContext<T> = {appLet: null};

	constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
		_viewContainer.createEmbeddedView(_templateRef, this._context);
	}

	@Input()
	set appLet(value: T) {
		this._context.appLet = value;
	}
}
