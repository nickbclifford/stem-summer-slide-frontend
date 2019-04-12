import { Component, OnInit } from '@angular/core';
import { NextQuestion, UserService } from '../../services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	nextQuestion!: NextQuestion | null;

	constructor(private userService: UserService) { }

	ngOnInit() {
		// If I tried to put this in an async pipe, it would start spamming calls for some reason
		this.userService.getNextQuestion().subscribe(question => {
			this.nextQuestion = question;
		});
	}

}
