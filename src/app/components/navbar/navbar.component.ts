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

	constructor(private authService: AuthService, private dialog: MatDialog, private userService: UserService) { }

	login() {
		this.dialog.open(LoginDialogComponent);
	}

	logout() {
		this.authService.logout();
	}

}
