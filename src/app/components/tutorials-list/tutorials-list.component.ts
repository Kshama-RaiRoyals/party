import { Component, OnInit, ViewChild } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { MatTable } from '@angular/material/table';

export interface Item {
  id: number;
  name: string;
  company_name: string;
  email: string;
  mobile_no: string;
  telephone_no: string;
  whatsapp_no: string;
  gstin: string;
  pan_no: string;
  credit_limit: number;
  apply_tds: boolean;
  date_of_birth: string;
  anniversary_date: string;
  is_active: boolean;
  login_access: boolean;
  remark: string;
  image: string | null;
  address: { street: string, city: string, state: string, country: string, zip: string }[];
  bank_id: { bank_name: string, account_number: string, ifsc_code: string }[];
  userid: { id: number, username: string, phone_number: string | null, user_permissions: any[], is_active: boolean };
}

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  items: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'company_name', 'email', 'mobile_no', 'telephone_no', 'whatsapp_no', 'gstin', 'pan_no', 'credit_limit', 'apply_tds', 'date_of_birth', 'anniversary_date', 'is_active', 'login_access', 'remark', 'image', 'address', 'bank_id', 'userid', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }


  deleteItem(id: number): void {
    console.log(id)
    this.tutorialService.delete(id).subscribe(()=>{
      this.retrieveTutorials();
    });

  }
}
