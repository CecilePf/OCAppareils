import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-appareil-view',
	templateUrl: './appareil-view.component.html',
	styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

    appareils: any[];
    appareilSubscription: Subscription;
	isAuth: boolean = false;

	constructor(private appareilService: AppareilService) { 
		setTimeout(
		() => {
			this.isAuth = true;
		}, 2000
		);
	}

	lastUpdate = new Promise((resolve, reject) => {
		const date = new Date();
		setTimeout(
			() => {
				resolve(date);
			}, 2000
		);
	});  

	ngOnInit() {
        //this.appareils = this.appareilService.appareils;
        // this.appareilService.getAppareilsFromServer();
       
        this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
            (appareils: any[]) => {
                this.appareils = appareils;
            }
        );
        this.appareilService.emitAppareilSubject();
          
	}

	onAllumer() {
		this.appareilService.switchOnAll();
	}

	onEteindre() {
		if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
			this.appareilService.switchOffAll();
		} else {
			return null;
		}
    }
    
    onSave() {
        this.appareilService.saveAppareilsToServer();
    }

    onFetch() {
        this.appareilService.getAppareilsFromServer();
    }

}
