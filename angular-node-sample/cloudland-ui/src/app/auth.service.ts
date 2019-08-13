import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { UserState } from './user-state';

@Injectable()
export class AuthService {

  userState : UserState;
  constructor(private http: HttpClient) { }

  public isAuthenticated(): Observable<UserState> {
    
    if(typeof this.userState === 'undefined') {
      return this.checkAuthenticated().do(data => {
        this.userState = data;
      });
    } else {
      return Observable.of(this.userState);
    }
    
  }
  
  
  private isLoggedUrl = "http://localhost:3000/auth/logged";
  checkAuthenticated(): Observable<UserState>{
    console.log("calling auth service");
    return this.http.get<UserState>(this.isLoggedUrl, {withCredentials: true});
  } 

}
