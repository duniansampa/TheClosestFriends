import { Component, OnInit } from '@angular/core';  
import { Http, Headers } from '@angular/http';  
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';  
import { FetchPersonComponent } from '../fetchperson/FetchPerson.component';  
import { PersonService } from '../../Services/PersonService.service';  

@Component({  
    selector: 'addperson',  
    templateUrl: './AddPerson.component.html'  
})  

export class CreatePerson implements OnInit {  

    personForm: FormGroup;  
    title: string = "Create";  
    id: number = 0;  
    errorMessage: any;  

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,  
        private personService: PersonService, private _router: Router) {  
        if (this._avRoute.snapshot.params["id"]) {  

            this.id = this._avRoute.snapshot.params["id"];  
        }  

        this.personForm = this._fb.group({  
            name: ['', [Validators.required]],  
            latitude: ['', [Validators.required]],  
            longitude: ['', [Validators.required]],  
        })  
    }  

    ngOnInit() {  

    }  

    save() {  
        if (!this.personForm.valid) {  
            return;  
        }  
        if (this.title == "Create") {  
            this.personService.add(this.personForm.value)  
                .subscribe((data) => { }, error => this.errorMessage = error)

           this.cancel();
        }  
    }  
    cancel() {  
        this._router.navigate(['/fetch-person']);  
    }  

    get name() { return this.personForm.get('name'); }  
    get latitude() { return this.personForm.get('latitude'); }  
    get longitude() { return this.personForm.get('longitude'); }  
}
