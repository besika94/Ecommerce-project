import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  displayLoginForm: boolean = true;
  switchText: string = '';
  model = {
    email: '',
    password: '',
  };

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      this.switchForms(params.type);
    });
  }

  ngOnInit(): void {}

  login() {
    const { email, password } = this.model;
    if (email !== '' && password !== '') this.router.navigateByUrl('/home');
  }

  switchFromText(url: string) {
    this.router.navigateByUrl(url);
  }

  switchForms(type: string) {
    if (type === 'login') {
      this.displayLoginForm = true;
      this.switchText = 'Register';
    } else {
      this.displayLoginForm = false;
      this.switchText = 'Sign in';
    }
  }
}
