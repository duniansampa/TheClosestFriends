import { NgModule } from '@angular/core';
import { PersonService } from './Services/PersonService.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchPersonComponent } from './components/fetchperson/FetchPerson.component'
import { CreatePerson } from './components/addperson/AddPerson.component'
import { ClosestFriendsComponent } from './components/closestfriends/ClosestFriends.component'


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchPersonComponent,
        CreatePerson,
        ClosestFriendsComponent
    ],

    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-person', component: FetchPersonComponent },
            { path: 'register-person', component: CreatePerson },
            { path: 'closest-friends/:id', component: ClosestFriendsComponent },
            //{ path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [PersonService]
})

export class AppModuleShared {
}