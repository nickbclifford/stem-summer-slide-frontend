import { Component } from '@angular/core';
import { AuthService, AuthState } from '../../services/auth.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Possibly } from '../../common/types';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

	authState: Possibly<AuthState>;

	constructor(private authService: AuthService, private dialog: MatDialog) {
		this.authService.$.subscribe(
			state => this.authState = state,
			err => console.error(err)
		);
	}

	login() {
		this.dialog.open(LoginDialogComponent);
	}

	logout() {
		this.authService.logout();
	}

}
