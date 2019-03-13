import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

	// Apparently fields have to be public if you're using them in the template
	// Otherwise the Angular language service throws a fit
	constructor(private authService: AuthService, private dialog: MatDialog, public userService: UserService) { }

	login() {
		this.dialog.open(LoginDialogComponent);
	}

	logout() {
		this.authService.logout();
	}

}
