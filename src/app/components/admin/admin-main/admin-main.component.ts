import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

const stageNames = ['units', 'questions', 'answers'];

@Component({
	selector: 'app-admin-main',
	templateUrl: './admin-main.component.html',
	styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

	selectedStage = 0;

	id: number | null = null;

	constructor(private route: ActivatedRoute, private location: Location) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const stage = params.get('stage') || 'units';
			this.selectedStage = stageNames.indexOf(stage);

			let id: number | null = parseInt(params.get('id') || '', 10);
			if (isNaN(id)) {
				id = null;
			}
			this.id = id;
		});
	}

	onTabChange(tabIndex: number) {
		// Keeps the URL in sync with the current tab state without actually re-rendering any routes
		this.location.go(`/admin/${stageNames[tabIndex]}`);
	}

}
