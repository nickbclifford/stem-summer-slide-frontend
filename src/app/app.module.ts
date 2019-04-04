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
	MatDialogModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatProgressSpinnerModule,
	MatRippleModule,
	MatSnackBarModule,
	MatToolbarModule,
	MatTooltipModule
} from '@angular/material';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APIInterceptor } from './common/api-interceptor';
import { HomeComponent } from './components/home/home.component';
import { UnitComponent } from './components/unit/unit.component';
import { QuestionComponent } from './components/question/question.component';
import { LetDirective } from './common/let.directive';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginDialogComponent,
		HomeComponent,
		UnitComponent,
		QuestionComponent,
		LetDirective
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: retrieveJWT,
				whitelistedDomains: [environment.backendURL.replace(/https?:\/\//, '')]
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
		MatProgressSpinnerModule
	],
	entryComponents: [
		LoginDialogComponent,
		UnitComponent
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
