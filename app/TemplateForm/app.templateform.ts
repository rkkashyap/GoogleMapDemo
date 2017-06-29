import { Component } from '@angular/core';

@Component({
    selector: 'my-tf',
    templateUrl: 'app/TemplateForm/app.templateform.html'
})
export class TemplateFormComponent{
    logForm(value:any){
        console.log(value);
    }
}