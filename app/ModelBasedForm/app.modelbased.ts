import { Component } from '@angular/core';
import { IPerson } from './app.person';

@Component({
    selector: 'my-mf',
    templateUrl: 'app/ModelBasedForm/app.modelbased.html'
})
export class ModelBasedFormComponent {
    person: IPerson = {
        firstname: "Manish",
        lastname: "",
        address: {
            city: "",
            zip: 0
        }
    };

    logForm() {
        console.log(this.person);
    }
}