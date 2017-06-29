"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var app_templateform_1 = require("./TemplateForm/app.templateform");
var app_modelbased_1 = require("./ModelBasedForm/app.modelbased");
var app_reactiveform_1 = require("./ReactiveForm/app.reactiveform");
var core_2 = require("angular2-google-maps/core");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            core_2.AgmCoreModule.forRoot({
                apiKey: "AIzaSyAoRicqQbnEKmAcn_0jMaw00iyf9p9Bqeo",
                libraries: ["places"]
            }),
            platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule
        ],
        declarations: [app_component_1.AppComponent, app_reactiveform_1.ReactiveFormComponent, app_modelbased_1.ModelBasedFormComponent, app_templateform_1.TemplateFormComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
