import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MyglobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyglobalsProvider {

    //declare global variables here, inject them into pages like 'about.ts'
    public events;

  constructor(public http: HttpClient) {
    console.log('Hello MyglobalsProvider Provider');
  }

}
