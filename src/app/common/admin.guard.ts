import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.authService.$.pipe(
			map(s => !!(s && s.admin)),
			tap(a => {
				if (!a) {
					this.router.navigate(['/home']);
				}
			})
		);
	}

}
