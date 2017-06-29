import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'my-rtf',
    templateUrl: 'app/ReactiveForm/app.reactiveform.html'
})
export class ReactiveFormComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            firstname: [null, Validators.required],
            lastname: [null, Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(5)])],
            address: this.fb.group({
                city: [null, Validators.required],
                zip: 0
            })
        });
    }

    logForm(value: any) {
        console.log(value);
    }
}


// import { Component } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';

// @Component({
//     selector: 'my-rtf',
//     templateUrl: 'app/ReactiveForm/app.reactiveform.html'
// })
// export class ReactiveFormComponent {
//     registerForm = new FormGroup({
//         firstname: new FormControl(),
//         lastname: new FormControl(),
//         address: new FormGroup({
//             city: new FormControl(),
//             zip: new FormControl()
//         })
//     });

//     logForm(value: any) {
//         console.log(value);
//     }
// }