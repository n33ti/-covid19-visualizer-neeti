import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.get<any>(`https://5f043eb58b06d60016dde312.mockapi.io/blogs/credentials`)
            .pipe(map(user => {
              
                for(let i = 0; i<user.length; i++)
                {
            //      console.log(user[i].username === username && user[i].password === password)
                  if(user[i].username === username && user[i].password === password)
                  {
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  return user;
                  }
              
                }
            
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.removeItem('currentUser');
                return;
               
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(username, password)
    {
      return this.http.post<any>(`https://5f043eb58b06d60016dde312.mockapi.io/blogs/credentials`, {username, password})
      .pipe(map(user => {
 
          // store user details and jwt token in local storage to keep user logged in between page refreshes
       
          return user;
                   
      }));
    }
}
