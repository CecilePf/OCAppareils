import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PremierComponentComponent } from './premier-component/premier-component.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AppareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';

import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { AuthService } from './services/auth.service';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
    { path: 'appareils', component: AppareilViewComponent, canActivate: [AuthGuard] },
    { path: 'appareils/:id', component: SingleAppareilComponent, canActivate: [AuthGuard] },
    { path: 'auth', component: AuthComponent },
    { path: '', component: AppareilViewComponent },
    { path: 'not-found', component: FourOhFourComponent },
    { path: '**', redirectTo: '/not-found' },
];

@NgModule({
    declarations: [
        AppComponent,
        PremierComponentComponent,
        AppareilComponent,
        AuthComponent,
        AppareilViewComponent,
        SingleAppareilComponent,
        FourOhFourComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AppareilService,
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
