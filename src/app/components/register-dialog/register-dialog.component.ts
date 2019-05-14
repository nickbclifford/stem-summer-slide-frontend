import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
	selector: 'app-register-dialog',
	templateUrl: './register-dialog.component.html',
	styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {

	formGroup = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		confirmEmail: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required),
		confirmPassword: new FormControl('', Validators.required)
	}, [
		controlsMustMatchValidator('email', 'confirmEmail', 'mismatchedEmails'),
		controlsMustMatchValidator('password', 'confirmPassword', 'mismatchedPasswords')
	]);

	// For shorthand in template
	fc = this.formGroup.controls;

	constructor(
		private authService: AuthService,
		private dialogRef: MatDialogRef<RegisterDialogComponent>
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

	onRegister() {
		console.log(this.formGroup.value);

		const { name, email, password } = this.formGroup.value;
		this.authService.register(name, email, password).subscribe(() => this.dialogRef.close());
	}

}

function controlsMustMatchValidator(sourceKey: string, confirmKey: string, errorKey: string): ValidatorFn {
	return control => {
		const group = control as FormGroup;
		const source = group.controls[sourceKey];
		const confirm = group.controls[confirmKey];

		if (source.value !== confirm.value) {
			return { [errorKey]: true };
		}

		return null;
	};
}
