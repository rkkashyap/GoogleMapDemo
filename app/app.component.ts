import { Component,ChangeDetectorRef,ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
    //selector: 'my-app',
    //template: ` <my-rtf></my-rtf> `

    selector: 'my-app',
  template: `
  
   <div class="container">
      <h1>Angular 2 + Google Maps Places Autocomplete</h1>
      {{searchControl.value}}
      <div class="form-group">
        <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off"
         type="text" class="form-control" #search [formControl]="searchControl"
         (ngModelChange)="mychange($event)"
          (input)="onSearchInput($event.target.value)">
      </div>
      <sebm-google-map [latitude]="latitude"  [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
        <sebm-google-map-marker [latitude]="latitude" [longitude]="longitude"></sebm-google-map-marker>
      </sebm-google-map>

      <h2>address: {{address | json}}</h2>
      <h2>state: {{state | json}}</h2>
       <h2>Country: {{country | json}}</h2>
    </div>
  
  `,
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `]


})


export class AppComponent implements OnInit {

  address: any = {};
 autocomplete: google.maps.places.Autocomplete;

 country : string = "";
 state : string = "";
 city : string = "";   

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  place:google.maps.places.PlaceResult;
   options={
       center:{
                lat : 39.8282,
                lng : -98.5795
            },
    zoom:15,
    mapTypeControl:false,
    MapTypeId: google.maps.MapTypeId.TERRAIN,

    };

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef
  ) {}


mychange(val)
{
   console.log(val); // updated value
this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      this.autocomplete = autocomplete;

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          for (var i = 0; i < this.place.address_components.length; i++) {
            var addressType = this.place.address_components[i].types[0];
            console.log(addressType);
            this.address[addressType] = this.place.address_components[i].long_name;
             if (addressType == "country")
             {
               this.country = this.place.address_components[i].long_name;
             }
              if (addressType == "administrative_area_level_1")
             {
               this.state = this.place.address_components[i].long_name;
             }
             
             console.log(this.place.address_components[i].long_name);
           }
          
          this.ref.detectChanges();
         
          //this.setValue(this.place.address_components[3].long_name, this.place.address_components[2].long_name,
          // this.place.address_components[1].long_name);
         // console.log(this.place.name);
          //console.log(place.address_components[0].short_name);
          //verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });



}
onSearchInput(searchValue) {
  console.log(searchValue);
    // let newSearchValues: string[] = searchValue.split(' ');
    // // if the current search term has a space,
    // // create the new label and update the input field
    // if (newSearchValues.length > 1) {
    //   console.log(newSearchValues[0]);
    //   this.searchControl.setValue(newSearchValues[1]);
    // }
  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl(['pune']);
   
    this.searchControl.valueChanges.subscribe(value => {
      // do something with value here
      console.log(value);
    });




    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      this.autocomplete = autocomplete;

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          for (var i = 0; i < this.place.address_components.length; i++) {
            var addressType = this.place.address_components[i].types[0];
            console.log(addressType);
            this.address[addressType] = this.place.address_components[i].long_name;
             if (addressType == "country")
             {
               this.country = this.place.address_components[i].long_name;
             }
              if (addressType == "administrative_area_level_1")
             {
               this.state = this.place.address_components[i].long_name;
             }
             
             console.log(this.place.address_components[i].long_name);
           }
          
          this.ref.detectChanges();
         
          //this.setValue(this.place.address_components[3].long_name, this.place.address_components[2].long_name,
          // this.place.address_components[1].long_name);
         // console.log(this.place.name);
          //console.log(place.address_components[0].short_name);
          //verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

map:any;
   ngAfterViewInit(){
        this.map=new google.maps.Map(this.searchElementRef.nativeElement,this.options); 
        this.getLocation();

       // this.onSearchResultSelect();
    } 

    

 getLocation() 
    {
        if (navigator.geolocation) {
            var self = this;
            navigator.geolocation.getCurrentPosition(function(response){
               // self.showPosition(response, self);
               console.log(response);
            }, function() {
            alert("Unable to get GPS Location");
            }, {
            enableHighAccuracy : true
            });
        }
        else {
        alert("Geolocation is not supported by this browser.");
        }
    }


  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}



