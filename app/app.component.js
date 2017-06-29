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
var core_2 = require("angular2-google-maps/core");
var AppComponent = (function () {
    function AppComponent(mapsAPILoader, ngZone, ref) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.ref = ref;
        this.address = {};
        this.country = "";
        this.state = "";
        this.city = "";
        this.options = {
            center: {
                lat: 39.8282,
                lng: -98.5795
            },
            zoom: 15,
            mapTypeControl: false,
            MapTypeId: google.maps.MapTypeId.TERRAIN,
        };
    }
    AppComponent.prototype.mychange = function (val) {
        var _this = this;
        console.log(val); // updated value
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            _this.autocomplete = autocomplete;
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    _this.place = autocomplete.getPlace();
                    for (var i = 0; i < _this.place.address_components.length; i++) {
                        var addressType = _this.place.address_components[i].types[0];
                        console.log(addressType);
                        _this.address[addressType] = _this.place.address_components[i].long_name;
                        if (addressType == "country") {
                            _this.country = _this.place.address_components[i].long_name;
                        }
                        if (addressType == "administrative_area_level_1") {
                            _this.state = _this.place.address_components[i].long_name;
                        }
                        console.log(_this.place.address_components[i].long_name);
                    }
                    _this.ref.detectChanges();
                    //this.setValue(this.place.address_components[3].long_name, this.place.address_components[2].long_name,
                    // this.place.address_components[1].long_name);
                    // console.log(this.place.name);
                    //console.log(place.address_components[0].short_name);
                    //verify result
                    if (_this.place.geometry === undefined || _this.place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = _this.place.geometry.location.lat();
                    _this.longitude = _this.place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    AppComponent.prototype.onSearchInput = function (searchValue) {
        console.log(searchValue);
        // let newSearchValues: string[] = searchValue.split(' ');
        // // if the current search term has a space,
        // // create the new label and update the input field
        // if (newSearchValues.length > 1) {
        //   console.log(newSearchValues[0]);
        //   this.searchControl.setValue(newSearchValues[1]);
        // }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //create search FormControl
        this.searchControl = new forms_1.FormControl(['pune']);
        this.searchControl.valueChanges.subscribe(function (value) {
            // do something with value here
            console.log(value);
        });
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            _this.autocomplete = autocomplete;
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    _this.place = autocomplete.getPlace();
                    for (var i = 0; i < _this.place.address_components.length; i++) {
                        var addressType = _this.place.address_components[i].types[0];
                        console.log(addressType);
                        _this.address[addressType] = _this.place.address_components[i].long_name;
                        if (addressType == "country") {
                            _this.country = _this.place.address_components[i].long_name;
                        }
                        if (addressType == "administrative_area_level_1") {
                            _this.state = _this.place.address_components[i].long_name;
                        }
                        console.log(_this.place.address_components[i].long_name);
                    }
                    _this.ref.detectChanges();
                    //this.setValue(this.place.address_components[3].long_name, this.place.address_components[2].long_name,
                    // this.place.address_components[1].long_name);
                    // console.log(this.place.name);
                    //console.log(place.address_components[0].short_name);
                    //verify result
                    if (_this.place.geometry === undefined || _this.place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = _this.place.geometry.location.lat();
                    _this.longitude = _this.place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.map = new google.maps.Map(this.searchElementRef.nativeElement, this.options);
        this.getLocation();
        // this.onSearchResultSelect();
    };
    AppComponent.prototype.getLocation = function () {
        if (navigator.geolocation) {
            var self = this;
            navigator.geolocation.getCurrentPosition(function (response) {
                // self.showPosition(response, self);
                console.log(response);
            }, function () {
                alert("Unable to get GPS Location");
            }, {
                enableHighAccuracy: true
            });
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    AppComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild("search"),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "searchElementRef", void 0);
AppComponent = __decorate([
    core_1.Component({
        //selector: 'my-app',
        //template: ` <my-rtf></my-rtf> `
        selector: 'my-app',
        template: "\n  \n   <div class=\"container\">\n      <h1>Angular 2 + Google Maps Places Autocomplete</h1>\n      {{searchControl.value}}\n      <div class=\"form-group\">\n        <input placeholder=\"search for location\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\"\n         type=\"text\" class=\"form-control\" #search [formControl]=\"searchControl\"\n         (ngModelChange)=\"mychange($event)\"\n          (input)=\"onSearchInput($event.target.value)\">\n      </div>\n      <sebm-google-map [latitude]=\"latitude\"  [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\n        <sebm-google-map-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></sebm-google-map-marker>\n      </sebm-google-map>\n\n      <h2>address: {{address | json}}</h2>\n      <h2>state: {{state | json}}</h2>\n       <h2>Country: {{country | json}}</h2>\n    </div>\n  \n  ",
        styles: ["\n    .sebm-google-map-container {\n      height: 300px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [core_2.MapsAPILoader,
        core_1.NgZone,
        core_1.ChangeDetectorRef])
], AppComponent);
exports.AppComponent = AppComponent;
