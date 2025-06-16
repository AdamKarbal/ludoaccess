import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { SettingsService } from '../../../services/setting.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  selectedRole: string = '';
  selectedUser: User | null = null;
  constructor(private router: Router, private authService: AuthService,private setting: SettingsService
  ) {}

onUserSelected(user: User | null) {
  this.selectedUser = user;
  this.selectedRole = user ? user.role : '';
  if (user) {
    this.authService.setUser(user);
    if (user.role === 'child') {
      this.setting.loadSettings(user.id);
    }
  }
}

  pageSuivante() {
    if (this.selectedRole === 'ergo') {
      this.router.navigate(['/reglage']);
    } else {
      this.router.navigate(['/acceuil']);
    }
    this.authService.currentUser$.subscribe(user => {
      //console.log('Current user from AuthService in pageSuivante:', user);
    });
  }
}
