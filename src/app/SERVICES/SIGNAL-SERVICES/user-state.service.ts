import { Injectable, signal } from '@angular/core';
import { User } from '../../INTERFACE/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  user = signal<User | null>(null);

  setUser(newUser: User): void {
    this.user.set(newUser);
  }

  clearUser(): void {
    this.user.set(null);
  }
}
