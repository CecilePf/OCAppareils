import { Component, Input, OnInit } from '@angular/core';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { AppareilService } from '../services/appareil.service';


@Component({
    selector: 'app-appareil',
    templateUrl: './appareil.component.html',
    styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  
    @Input() appareilName: string;
    @Input() appareilStatus: string;
    @Input() indexOfAppareil: number;

    constructor(private appareilService: AppareilService) {
    }

    ngOnInit() {
    }

    getStatus() {
        return this.appareilStatus;
    }

    getColor() {
        if (this.appareilStatus === 'éteint') {
            return 'red';
        } else {
            return 'green';
        }
    }

    onSwitch() {
        if(this.appareilStatus === 'allumé') {
            this.appareilService.switchOffOne(this.indexOfAppareil);
        } else if(this.appareilStatus === 'éteint') {
            this.appareilService.switchOnOne(this.indexOfAppareil);
        }
    }

}
