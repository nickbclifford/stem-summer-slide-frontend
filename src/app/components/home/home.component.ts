import { Component, OnInit } from '@angular/core';
import { NextQuestion, User, UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { switchMap } from 'rxjs/operators';
import { Possibly } from '../../common/types';
import { of } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	nextQuestion!: NextQuestion | null;
	user!: Possibly<User>;

	constructor(private userService: UserService, private dialog: MatDialog) { }

	ngOnInit() {
		// I tried to put this in an async pipe but it would keep spamming calls for some reason
		this.userService.$.pipe(
			switchMap(user => {
				this.user = user;
				if (user) {
					return this.userService.getNextQuestion();
				} else {
					return of(null);
				}
			})
		).subscribe(question => {
			this.nextQuestion = question;
		});
	}

	onRegister() {
		this.dialog.open(RegisterDialogComponent);
	}

}
