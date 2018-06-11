import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../Services/PersonService.service'

@Component({
    selector: 'closestfriends',
    templateUrl: './ClosestFriends.component.html'
})

export class ClosestFriendsComponent {

    public friendList: IPersonData[];
    public person: IPersonData;
    id: number = 0;  

    constructor(public http: Http, private avRoute: ActivatedRoute, private router: Router, private personService: PersonService) {

        if (this.avRoute.snapshot.params["id"]) {

            this.id = this.avRoute.snapshot.params["id"];
        }  

        this.friendList = [];
        this.person = <IPersonData>({});

        this.get(this.id);

        this.getClosestFriends(this.id);
    }

    get(personId) {
        this.personService.get(personId).subscribe(
            data => this.person = data
        )
    }

    getClosestFriends(personId) {
        this.personService.getClosestFriends(personId).subscribe(
            data => this.friendList = data
        )
    }

}

interface IPersonData {
    id: number;
    name: string;  
    latitude: string;
    longitude: string;
}