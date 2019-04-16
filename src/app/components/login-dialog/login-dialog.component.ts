import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

	formGroup = new FormGroup({
		email: new FormControl('', [
			Validators.required,
			Validators.email
		]),
		password: new FormControl('', Validators.required)
	});

	// For shorthand in template
	fc = this.formGroup.controls;

	hidePassword = true;

	constructor(
		private authService: AuthService,
		private dialogRef: MatDialogRef<LoginDialogComponent>
	) { }

	get emailErrorMessage() {
		if (this.fc.email.hasError('required')) {
			return 'Email required!';
		} else if (this.fc.email.hasError('email')) {
			return 'Invalid email address!';
		}
	}

	onCancel() {
		this.dialogRef.close();
	}

	onLogin() {
		const { email, password } = this.formGroup.value;
		this.authService.login(email, password).subscribe(
			() => this.dialogRef.close(),
			() => this.formGroup.reset()
		);
	}

}
