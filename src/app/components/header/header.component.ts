import { Component } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private tutorialService: TutorialService,
    private router: Router
  ){}

  Logout()
  { 
    this.tutorialService.logout(Tutorial).subscribe((data: {}) => {
       
      localStorage.clear();     
      this.router.navigate(['/login']);
    });
  }
}
