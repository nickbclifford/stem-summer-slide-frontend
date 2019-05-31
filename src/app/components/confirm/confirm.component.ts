import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

	isPending = true;
	success = false;

	constructor(private route: ActivatedRoute, private authService: AuthService) { }

	ngOnInit() {
		this.route.paramMap.pipe(
			switchMap(params => {
				// Same as in question component, I don't think we need to handle the null case
				const userId = params.get('userId')!;
				const hash = params.get('hash')!;

				return this.authService.confirm(parseInt(userId, 10), hash);
			})
		).subscribe(
			// I know that there's some kind of equivalent to `finally` *somewhere*
			// But for some reason it just won't fire, no matter what I try
			// So screw it, it's just going in the handlers directly
			() => {
				this.success = true;
				this.isPending = false;
			},
			() => {
				this.success = false;
				this.isPending = false;
			}
		);
	}

}
