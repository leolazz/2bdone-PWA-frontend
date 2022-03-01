import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { LoginGQL, RegisterGQL } from '../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  token = '';

  constructor(
    private storage: Storage,
    private registerGQLService: RegisterGQL,
    private loginGQLService: LoginGQL
  ) {}

  async getToken(): Promise<string> {
    try {
      this.token = await this.storage.get('token');

      if (this.token != null) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }

      return this.token;
    } catch (error) {
      this.token = null;
      this.isAuthenticated = false;
    }
  }

  async login(credentials: { email; password }): Promise<Observable<boolean>> {
    const result = await this.loginGQLService.mutate(credentials).toPromise();
    this.token = result.data.login;
    if (this.token) {
      await this.storage.set('token', this.token);
      this.isAuthenticated = true;
    }
    return new Observable((subscriber) => {
      subscriber.next(this.isAuthenticated);
      subscriber.complete();
    });
  }

  logout(): Promise<void> {
    this.isAuthenticated = false;
    return this.storage.remove('token');
  }
}
