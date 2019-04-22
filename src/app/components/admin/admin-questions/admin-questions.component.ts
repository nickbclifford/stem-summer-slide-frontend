import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-admin-questions',
	templateUrl: './admin-questions.component.html',
	styleUrls: ['./admin-questions.component.scss']
})
export class AdminQuestionsComponent {

	@Input() id: number | null = null;

	constructor() { }

}
