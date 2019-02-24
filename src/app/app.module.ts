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

const appRoutes: Routes = [
    { path: 'appareils', component: AppareilViewComponent },
    { path: 'auth', component: AuthComponent },
    { path: '', component: AppareilViewComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        PremierComponentComponent,
        AppareilComponent,
        AuthComponent,
        AppareilViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AppareilService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
