webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createdogprofile_createdogprofile__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matching_matching__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messaging_messaging__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__createdogprofile_createdogprofile__["a" /* CreateDogProfilePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__login_login__["a" /* LoginPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__matching_matching__["a" /* MatchingPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__messaging_messaging__["a" /* MessagingPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/mcresswell/pupper/pup/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Create Dog Profile Page" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Login" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Matching" tabIcon="contacts"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Messaging" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="Signup" tabIcon="contacts"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/mcresswell/pupper/pup/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/mcresswell/pupper/pup/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n      <div class="spacer" style="height: 40px;"></div>\n    <ion-title>\n      Login\n    </ion-title>\n    <ion-list id="login-list2">\n        <label class="item item-input item-floating-label" id="login-input1">\n          <span class="input-label">Email</span>\n          <input type="email" placeholder="Email">\n        </label>\n        <label class="item item-input item-floating-label" id="login-input2">\n          <span class="input-label">Password</span>\n          <input type="password" placeholder="Password">\n        </label>\n      </ion-list>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n\n<!-- <ion-view title="Login" hide-nav-bar="true" hide-back-button="true" id="page5">\n  <ion-content padding="true" style="background: url(img/wIt1PIBiSmA7Bo432NXZ_IMG_9910.jpg) no-repeat center;background-size:cover;" class="manual-ios-statusbar-padding">\n    <div class="spacer" style="height: 40px;"></div>\n    <form id="login-form1" class="list">\n      <div class="spacer" style="height: 40px;"></div>\n      <ion-list id="login-list2">\n        <label class="item item-input item-floating-label" id="login-input1">\n          <span class="input-label">Email</span>\n          <input type="email" placeholder="Email">\n        </label>\n        <label class="item item-input item-floating-label" id="login-input2">\n          <span class="input-label">Password</span>\n          <input type="password" placeholder="Password">\n        </label>\n      </ion-list>\n      <div class="spacer" style="height: 40px;"></div>\n      <a ui-sref="tabsController.matching()" id="login-button1" class="button button-light button-block" ng-click="loginCtrl">Log in</a>\n      <a ui-sref="signup()" id="login-button2" class="button button-light button-block button-clear">Or create an account</a>\n    </form>\n  </ion-content>\n</ion-view> -->'/*ion-inline-end:"/Users/mcresswell/pupper/pup/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateDogProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateDogProfilePage = /** @class */ (function () {
    function CreateDogProfilePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    CreateDogProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-createdogprofile',template:/*ion-inline-start:"/Users/mcresswell/pupper/pup/src/pages/createdogprofile/createDogProfile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Create Dog Profile\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding="true" class="has-header">\n    <form id="createDogProfile-form3" class="list">\n      <label class="item item-input" id="createDogProfile-textarea1">\n        <span class="input-label">Dog\'s Name</span><textarea placeholder=""></textarea></label>\n      <label class="item item-input" id="createDogProfile-textarea2">\n        <span class="input-label">Breed</span><textarea placeholder=""></textarea></label>\n      <label class="item item-select" id="createDogProfile-select2">\n        <span class="input-label">Gender</span>\n        <select>\n          <option>Female</option>\n          <option>Male</option>\n        </select>\n      </label>\n      <ion-toggle toggle-class="toggle-positive" id="createDogProfile-toggle1">Is Neutered/Spayed</ion-toggle>\n      <label class="item item-select" id="createDogProfile-select4">\n        <span class="input-label">Life Stage</span>\n        <select>\n          <option>Puppy</option>\n          <option>Young</option>\n          <option>Adult</option>\n          <option>Mature</option>\n        </select>\n      </label>\n      <label class="item item-select" id="createDogProfile-select3">\n        <span class="input-label">Energy Level</span>\n        <select>\n          <option>Minimal</option>\n          <option>Low</option>\n          <option>Moderate</option>\n          <option>High</option>\n          <option>Extreme</option>\n        </select>\n      </label>\n      <div id="createDogProfile-button-bar4" class="button-bar">\n        <button id="createDogProfile-button16" class="button gradient-button button-block icon-left ion-ios-camera">Add Photo</button>\n        <button id="createDogProfile-button18" class="button button-calm button-block">Submit</button>\n      </div>\n    </form>\n  </ion-content>\n'/*ion-inline-end:"/Users/mcresswell/pupper/pup/src/pages/createdogprofile/createDogProfile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], CreateDogProfilePage);
    return CreateDogProfilePage;
}());

//# sourceMappingURL=createdogprofile.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MatchingPage = /** @class */ (function () {
    function MatchingPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    MatchingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-matching',template:/*ion-inline-start:"/Users/mcresswell/pupper/pup/src/pages/matching/matching.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Matching\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<!-- <ion-content padding="true" style="background: url(img/ehIWAuhQm0oAOMzHtQDK_IMG_9910.jpg) no-repeat center;background-size:cover;" class="manual-ios-statusbar-padding">\n  <div class="list card" id="matching-card22">\n    <ion-item class="light" id="matching-list-item24"></ion-item>\n    <ion-slides disable-side-menu-drag="" options="{\'loop\': true}" slider="slider2" delegate-handle="slider2" id="matching-slider2" style="width:calc(100% + 20px);height:400px;margin-left:-10px;">\n      <ion-slide-page id="matching-slide29" style="background:url(&quot;img/2c9cJGLkTpac2nEwh7JI_IMG_4326.jpeg&quot;) no-repeat center;background-size:cover;"></ion-slide-page>\n      <ion-slide-page id="matching-slide211" style="background:url(&quot;img/RjcUHWjQk6VNit5OOf5p_IMG_4271.jpeg&quot;) no-repeat center;background-size:cover;" class="padding">\n        <div style="display:table;width:100%;height:100%;">\n          <div style="display:table-row;">\n            <div style="display:table-cell;vertical-align:middle;"></div>\n          </div>\n        </div>\n      </ion-slide-page>\n      <ion-slide-page id="matching-slide210" style="background:url(&quot;img/BhQKQiDsQazcBIVLqZgQ_IMG_4331.jpeg&quot;) no-repeat center;background-size:cover;"></ion-slide-page>\n    </ion-slides>\n    <div class="item item-body" id="matching-list-item-container5">\n      <div id="matching-markdown5" style="text-align:center;" class="show-list-numbers-and-dots">\n        <p style="margin-top:0px;color:#000000;">\n          <strong>Indy</strong> | Shiba Inu | Young</p>\n      </div>\n    </div>\n    <div id="matching-button-bar2" class="button-bar">\n      <button id="matching-button8" class="button button-positive button-block icon ion-android-cancel"></button>\n      <button id="matching-button9" class="button button-assertive button-block icon ion-ios-heart"></button>\n    </div>\n  </div>\n</ion-content> -->\n'/*ion-inline-end:"/Users/mcresswell/pupper/pup/src/pages/matching/matching.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], MatchingPage);
    return MatchingPage;
}());

//# sourceMappingURL=matching.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagingPage = /** @class */ (function () {
    function MessagingPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    MessagingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messaging',template:/*ion-inline-start:"/Users/mcresswell/pupper/pup/src/pages/messaging/messaging.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Messaging</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<!-- <ion-content padding="true" class="has-header">\n    <ion-list id="messaging-list4">\n      <ion-item class="item-avatar" id="messaging-list-item14" ng-repeat="item in items" ng-click="delete(item)" on-reorder="reorder(item,$fromIndex, $toIndex)">\n        <img src="img/AMwZb01eSxyALk2kr37T_IMG_3858.jpeg">\n        <h2>Item {{item.id}}</h2>\n        <ion-option-button class="button-positive">Chat</ion-option-button>\n        <ion-option-button class="button-assertive">Delete</ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content> -->\n'/*ion-inline-end:"/Users/mcresswell/pupper/pup/src/pages/messaging/messaging.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], MessagingPage);
    return MessagingPage;
}());

//# sourceMappingURL=messaging.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/mcresswell/pupper/pup/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Signup\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding="true" class="has-header">\n    <form id="signup-form2" class="list">\n      <ion-list id="signup-list3">\n        <label class="item item-input" id="signup-input3" name="fullName">\n          <span class="input-label">Pet Parent\'s Name</span>\n          <input type="text" placeholder="" ng-model="data.fullName">\n        </label>\n        <label class="item item-input" id="signup-input4" name="email">\n          <span class="input-label">Email</span>\n          <input type="email" placeholder="" ng-model="data.email">\n        </label>\n        <label class="item item-input" id="signup-input5" name="password">\n          <span class="input-label">Password</span>\n          <input type="text" placeholder="" ng-model="data.password">\n        </label>\n        <label class="item item-input" id="signup-input6" name="zipCode">\n          <span class="input-label">Zip Code</span>\n          <input type="text" placeholder="" ng-model="data.zipCode">\n        </label>\n        <label class="item item-input" id="signup-input7" name="birthdate">\n          <span class="input-label">Birthdate</span>\n          <input type="date" placeholder="" ng-model="data.birthdate">\n        </label>\n        <label class="item item-select" id="signup-select1" name="gender">\n          <span class="input-label">Gender</span>\n          <select ng-model="data.gender">\n            <option>Female</option>\n            <option>Male</option>\n          </select>\n        </label>\n      </ion-list>\n      <a ui-sref="tabsController.createDogProfile()" id="signup-button3" class="button gradient-button button-block">Sign up</a>\n    </form>\n  </ion-content>'/*ion-inline-end:"/Users/mcresswell/pupper/pup/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_createdogprofile_createdogprofile__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_matching_matching__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_messaging_messaging__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_createdogprofile_createdogprofile__["a" /* CreateDogProfilePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_matching_matching__["a" /* MatchingPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_messaging_messaging__["a" /* MessagingPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_createdogprofile_createdogprofile__["a" /* CreateDogProfilePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_matching_matching__["a" /* MatchingPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_messaging_messaging__["a" /* MessagingPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/mcresswell/pupper/pup/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/mcresswell/pupper/pup/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map