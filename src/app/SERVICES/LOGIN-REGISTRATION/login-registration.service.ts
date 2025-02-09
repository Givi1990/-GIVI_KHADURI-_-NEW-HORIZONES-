import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserRegistration } from '../../INTERFACE/registation.interface';
import { UserLogin } from '../../INTERFACE/login.interfece';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistrationService {

  private apiUser = "https://task4-2d93e-default-rtdb.europe-west1.firebasedatabase.app/users.json";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUser);
  }


  

  loginUser(data: UserLogin): Observable<UserRegistration> {
    return this.getUsers().pipe(
      map(users => {
        console.log('Fetched users:', users);
  
        if (!users) {
          throw new Error("No users found in the database.");
        }
  
        const { userName, password } = data;
  
        let usersArray: UserRegistration[];
        if ((users as any).userName) {
          usersArray = [users as UserRegistration];
        } else {
          usersArray = Object.values(users) as UserRegistration[];
        }
  
        console.log('Users array:', usersArray);
  
        let foundUser: UserRegistration | null = null;
        for (const user of usersArray) {
          if (user.userName === userName && user.password === password) {
            foundUser = user;
            break;
          }
        }
  
        console.log('Found user:', foundUser);
  
        if (!foundUser) {
          throw new Error("Invalid user name or password");
        }
  
        return foundUser;
      })
    );
  }
  
  
  
  

  checkUserExists(userName: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        if (!users) return false;
        return Object.values(users).some((u: any) => u.userName === userName);
      })
    );
  }
  

  registerUser(user: UserRegistration): Observable<any> {
    return this.http.put(this.apiUser, user);
  }
  
}
