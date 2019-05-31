import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitsComponent } from './components/units/units.component';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AdminGuard } from './common/admin.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'units',
		children: [
			{
				path: '',
				component: UnitsComponent
			},
			{
				path: ':id',
				component: UnitsComponent
			}
		]
	},
	{
		path: 'question/:id',
		component: QuestionComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'admin/:stage',
		canActivate: [AdminGuard],
		children: [
			{
				path: '',
				component: AdminMainComponent
			},
			{
				path: ':id',
				component: AdminMainComponent
			}
		]
	},
	{
		path: 'confirm/:userId/:hash',
		component: ConfirmComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
