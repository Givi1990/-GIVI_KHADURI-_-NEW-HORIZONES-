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

  loginUser(data: UserLogin): Observable<any> {
    return this.getUsers().pipe(
      map(users => {
        if (!users) return null; // Если база пуста

        const usersArray = Object.values(users);
        const user = usersArray.find((u: any) => u.email === data.email && u.password === data.password);
        
        return user ? user : null;
      })
    );
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        if (!users) return false;
        const usersArray = Object.values(users);
        return usersArray.some((u: any) => u.email === email);
      })
    );
  }

  registerUser(user: UserRegistration): Observable<any> {
    return this.http.post(this.apiUser, user);
  }
}
