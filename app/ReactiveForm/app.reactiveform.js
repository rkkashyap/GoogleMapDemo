"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ReactiveFormComponent = (function () {
    function ReactiveFormComponent(fb) {
        this.fb = fb;
    }
    ReactiveFormComponent.prototype.ngOnInit = function () {
        this.registerForm = this.fb.group({
            firstname: [null, forms_1.Validators.required],
            lastname: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(20), forms_1.Validators.minLength(5)])],
            address: this.fb.group({
                city: [null, forms_1.Validators.required],
                zip: 0
            })
        });
    };
    ReactiveFormComponent.prototype.logForm = function (value) {
        console.log(value);
    };
    return ReactiveFormComponent;
}());
ReactiveFormComponent = __decorate([
    core_1.Component({
        selector: 'my-rtf',
        templateUrl: 'app/ReactiveForm/app.reactiveform.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], ReactiveFormComponent);
exports.ReactiveFormComponent = ReactiveFormComponent;
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
