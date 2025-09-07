import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterFormComponent } from 'src/app/components/forms/register-form/register-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterFormComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      this.switchText = "Don't have an account? "
    } else {
      this.displayLoginForm = false;
      this.switchText = 'Already have an account? ';
    }
  }
}
