import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { retrieveJWT } from './common/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatProgressSpinnerModule,
	MatRippleModule,
	MatSelectModule,
	MatSnackBarModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule
} from '@angular/material';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIInterceptor } from './common/api-interceptor';
import { UnitsComponent } from './components/units/units.component';
import { UnitDialogComponent } from './components/unit-dialog/unit-dialog.component';
import { QuestionComponent } from './components/question/question.component';
import { LetDirective } from './common/let.directive';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminUnitsComponent } from './components/admin/admin-units/admin-units.component';
import { AdminQuestionsComponent } from './components/admin/admin-questions/admin-questions.component';
import { AdminAnswersComponent } from './components/admin/admin-answers/admin-answers.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginDialogComponent,
		UnitsComponent,
		UnitDialogComponent,
		QuestionComponent,
		LetDirective,
		HomeComponent,
		AboutComponent,
		RegisterDialogComponent,
		AdminMainComponent,
		AdminUnitsComponent,
		AdminQuestionsComponent,
		AdminAnswersComponent,
		ConfirmComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: retrieveJWT,
				whitelistedDomains: [environment.backendURL.replace(/https?:\/\//, '')],
				blacklistedRoutes: [
					environment.backendURL + '/auth/login',
					environment.backendURL + '/auth/register',
					environment.backendURL + '/auth/confirm'
				]
			}
		}),
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		MatListModule,
		MatGridListModule,
		MatRippleModule,
		MaterialFileInputModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		MatCardModule,
		MatDividerModule,
		MatTabsModule,
		MatChipsModule,
		MatSelectModule,
		MatCheckboxModule,
		FormsModule
	],
	entryComponents: [
		LoginDialogComponent,
		RegisterDialogComponent,
		UnitDialogComponent
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
