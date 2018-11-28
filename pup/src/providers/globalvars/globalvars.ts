import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarsProvider {

  jwtAccessToken: any;
  serverBaseUrl: any; 
  fileToUpload: any; 
  filename: any; 

  constructor(public http: HttpClient) {
    console.log('Hello GlobalvarsProvider Provider');
  }

  public setJwtAccessToken(value) {
    this.jwtAccessToken = value;
    console.log("Global Vars, JWT ACCESS TOKEN: " + this.jwtAccessToken); 
  }

  public getJwtAccessToken() {
    return this.jwtAccessToken;
  }

  public setFileToUpload(value) {
    this.fileToUpload = value;
    console.log("Global Vars, File To Upload: " + this.fileToUpload); 
  }

  public getFileToUpload() {
    return this.fileToUpload;
  }

  public setFilename(value) {
    this.filename = value;
    console.log("Global Vars, Pup Image Filename: " + this.filename); 
  }

  public getFilename() {
    return this.filename;
  }
}


