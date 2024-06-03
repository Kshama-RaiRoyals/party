import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'my-angular-project'; 
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private appService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.appService.login( formData).subscribe(
        (response:any) => {
          localStorage.setItem('token',response.token)
          console.log('Login successfully');
          this.router.navigate(['/tutorials'])
        },
        (error:any) => {

        }
      );
    }
  }
}
