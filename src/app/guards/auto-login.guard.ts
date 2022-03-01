import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  async canLoad() {
    await this.authService.getToken();
    const user = this.authService.isAuthenticated;
    console.log(user);
    if (user) {
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    } else {
      return true;
    }
  }
}
