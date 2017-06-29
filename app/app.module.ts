import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplateFormComponent } from './TemplateForm/app.templateform';
import { ModelBasedFormComponent } from './ModelBasedForm/app.modelbased';
import { ReactiveFormComponent } from './ReactiveForm/app.reactiveform';
import { AgmCoreModule } from "angular2-google-maps/core";

@NgModule({
    imports:
     [
        AgmCoreModule.forRoot({
      apiKey: "AIzaSyAoRicqQbnEKmAcn_0jMaw00iyf9p9Bqeo",
      libraries: ["places"]    
        }),
        BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [AppComponent, ReactiveFormComponent, ModelBasedFormComponent, TemplateFormComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }