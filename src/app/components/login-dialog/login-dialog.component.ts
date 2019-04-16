import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

	// TODO: Use a form group.

	email = new FormControl('', [
		Validators.required,
		Validators.email
	]);

	password = new FormControl('', Validators.required);
	hidePassword = true;

	constructor(
		private authService: AuthService,
		private dialogRef: MatDialogRef<LoginDialogComponent>
	) { }

	get emailErrorMessage() {
		if (this.email.hasError('required')) {
			return 'Email required!';
		} else if (this.email.hasError('email')) {
			return 'Invalid email address!';
		}
	}

	onCancel() {
		this.dialogRef.close();
	}

	onLogin() {
		this.authService.login(this.email.value, this.password.value).subscribe(
			() => this.dialogRef.close(),
			() => {
				this.email.reset();
				this.password.reset();
			}
		);
	}

}
