import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router, private angFireAuth: AngularFireAuth) { }
  async canActivate() {
    const isUserLoggedIn = await this.angFireAuth.authState.pipe(first()).toPromise();
    if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
