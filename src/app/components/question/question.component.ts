import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionService } from '../../services/question.service';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

	question!: Question;

	constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

	ngOnInit() {
		this.route.paramMap.pipe(
			switchMap(params => {
				// TODO: Handle null case?
				// I'm pretty sure this will never be null, since iirc Angular routing will throw a fit if there's no param provided
				// But maybe it won't, idk, we'll see
				const id = params.get('id')!;
				return this.questionService.getQuestion(parseInt(id, 10));
			})
		).subscribe(question => {
			this.question = question;
		});
	}

}
