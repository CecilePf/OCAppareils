import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

    appareilsSubject = new Subject<any[]>();

    // appareils = [
    //     {
    //         id: 1,
    //         name: 'Machine à laver',
    //         status: 'éteint'
    //     },
    //     {
    //         id: 2,
    //         name: 'Frigo',
    //         status: 'allumé'
    //     },
    //     {
    //         id: 3,
    //         name: 'Ordinateur',
    //         status: 'éteint'
    //     }
    // ];
    appareils = [];

    constructor(private httpClient: HttpClient) {

    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil;
    }

    emitAppareilSubject() {
        // this.appareilsSubject.next(this.appareils.slice());
        this.appareilsSubject.next(this.appareils);
    }
    
    switchOnAll() {
        for(let appareil of this.appareils) {
          appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }
    
    switchOffAll() {
        for(let appareil of this.appareils) {
          appareil.status = 'éteint';
          this.emitAppareilSubject();
        }
    }
    
    switchOnOne(i: number) {
        this.appareils[i].status = 'allumé';
        this.emitAppareilSubject();
    }
    
    switchOffOne(i: number) {
        this.appareils[i].status = 'éteint';
        this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
            .put('https://http-client-demo-e7d2c.firebaseio.com/appareils.json', this.appareils)
            .subscribe(
                () => {
                    console.log('Enregistrement ok');
                }, (error) => {
                    console.log('Erreur ' + error);
                }
            )
    }

    getAppareilsFromServer() {
        this.httpClient
            .get<any[]>('https://http-client-demo-e7d2c.firebaseio.com/appareils.json')
            .subscribe(
                (response) => {
                    console.log(response);
                    this.appareils = response;
                    console.log(this.appareils);
                    this.emitAppareilSubject();
                }, (error) => {
                    console.log("get error : " + error);
                }
            )
    }
    
}