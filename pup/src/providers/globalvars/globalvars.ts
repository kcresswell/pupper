import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarsProvider {

  serverBaseUrl: any;
  fileToUpload: any;
  filename: any;
  userId: any;
  userProfileData: any;
  headersWithAuthToken: any;
  userMatchProfile: any;

  constructor(public http: HttpClient) {
    this.setServerBaseUrl();
  }

  public setServerBaseUrl() {
    this.serverBaseUrl = "http://pupper.us-east-1.elasticbeanstalk.com";
  }

  public getServerBaseUrl() {
    return this.serverBaseUrl;
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
  }

  public getFilename() {
    return this.filename;
  }

  public setUserId(value) {
    this.userId = value;
  }

  public getUserId() {
    return this.userId;
  }

  public setUserProfileData(value) {
    this.userProfileData = value;
  }

  public getUserProfileData() {
    return this.userProfileData;
  }

  public setUserMatchProfile(value) {
    this.userMatchProfile = value;
  }

  public getUserMatchProfile() {
    return this.userMatchProfile;
  }

  public setHeadersWithAuthToken(value) {
    this.headersWithAuthToken = value;
  }

  public getHeadersWithAuthToken() {
    return this.headersWithAuthToken;
  }
}
