import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../Services/PersonService.service'

@Component({
    selector: 'fetchperson',
    templateUrl: './FetchPerson.component.html'
})

export class FetchPersonComponent {

    public personList: IPersonData [];

    constructor(public http: Http, private router: Router, private personService: PersonService) {
        this.personList = [];
        this.getAll();
    }

    getAll() {  
        this.personService.getAll().subscribe(
            data => this.personList = data
       )
    }

    refesh() {
        window.location.reload(true);
    }
     
    getClosestFriends(personId) {
        this.router.navigate(['/closest-friends', personId]);  
    }

    delete(personId) {
        var ans = confirm("Do you want to delete person with Id: " + personId);
        if (ans) {
            this.personService.delete(personId).subscribe((data) => {
                this.getAll();
            }, error => console.error(error))
        } 
        this.refesh();
    }
    
}

interface IPersonData {
    id: number;
    name: string;  
    latitude: string;
    longitude: string;
}