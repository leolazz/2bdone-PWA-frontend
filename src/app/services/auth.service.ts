import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { LoginGQL, RegisterGQL } from '../../graphql/generated/graphql';
import { map, tap, switchMap } from 'rxjs/operators';

const TOKEN_KEY = '';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';

  constructor(
    private storage: Storage,
    private registerGQLService: RegisterGQL,
    private loginGQLService: LoginGQL
  ) {
    this.loadToken();
  }

  async loadToken() {
    const token = await this.storage.get(TOKEN_KEY);
    if (token) {
      console.log('set token: ', token.value);
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email; password }): Observable<any> {
    return this.loginGQLService.mutate(credentials).pipe(
      map((result: any) => result.data.login),
      switchMap((token) => {
        return from(this.storage.set(TOKEN_KEY, token));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storage.remove(TOKEN_KEY);
  }
}
