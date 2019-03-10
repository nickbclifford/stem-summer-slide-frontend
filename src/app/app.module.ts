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
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSnackBarModule,
	MatToolbarModule
} from '@angular/material';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APIInterceptor } from './common/api-interceptor';
import { HomeComponent } from './components/home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginDialogComponent,
		HomeComponent
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
		MatListModule
	],
	entryComponents: [
		LoginDialogComponent
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
