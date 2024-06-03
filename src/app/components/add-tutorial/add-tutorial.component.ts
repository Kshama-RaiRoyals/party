import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { TutorialService } from '../../services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  itemForm!: FormGroup;

  constructor(private fb: FormBuilder,private HTTP: TutorialService,private router: Router,   private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      id: [null],
      name: [''],
      company_name: [''],
      email: [''],
      mobile_no: [''],
      telephone_no: [''],
      whatsapp_no: [''],
      gstin: [''],
      pan_no: [''],
      credit_limit: [null],
      apply_tds: [false],
      date_of_birth: [null],
      anniversary_date: [null],
      is_active: [true],
      login_access: [false],
      remark: [''],
      image: [null],
      address: this.fb.array([this.createAddressGroup()]),
      bank_id: this.fb.array([this.createBankGroup()]),
      userid: this.fb.group({
        id: [null],
        username: ['']
      })
    });
    const itemId = this.route.snapshot.params['id'];
    if (itemId) {
      this.HTTP.get(itemId).subscribe((item:any) => {
        this.itemForm.patchValue(item);
        if (item.address) {
          item.address.forEach((addr:any) => this.addAddress(addr));
        }
        if (item.bank_id) {
          item.bank_id.forEach((bank:any) => this.addBank(bank));
        }
      });
    }
  }
  image: any;
  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      this.image=inputElement.files
    }
  }
  createAddressGroup(): FormGroup {
    return this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zip: ['']
    });
  }

  createBankGroup(): FormGroup {
    return this.fb.group({
      bank_name: [''],
      account_number: [''],
      ifsc_code: ['']
    });
  }

  get addressArray() {
    return this.itemForm.get('address') as FormArray;
  }

  get bankArray() {
    return this.itemForm.get('bank_id') as FormArray;
  }

  addAddress(address = { street: '', city: '', state: '', country: '', zip: '' }) {
    this.addressArray.push(this.fb.group(address));
  }

  removeAddress(index: number) {
    this.addressArray.removeAt(index);
  }

  addBank(bank = { bank_name: '', account_number: '', ifsc_code: '' }) {
    this.bankArray.push(this.fb.group(bank));
  }

  removeBank(index: number) {
    this.bankArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      console.log(this.itemForm.value);
      const itemId = this.route.snapshot.params['id'];
      if (itemId) {
        this.HTTP.update(this.route.snapshot.params['id'],this.itemForm.value).subscribe((response)=>{
          // this.retrieveTutorials();
          alert(response.msg)
          this.router.navigate(['/tutorials'])
      });
    }
    else{
      const formData = new FormData();

      // Append all form fields except the image to the formData
      Object.keys(this.itemForm.value).forEach(key => {
        if (key !== 'image') {
          formData.append(key, this.itemForm.get(key)?.value);
        }
      });

      // Append the image file to the formData
      if (this.image) {
        formData.append('image', this.image);
      }
      this.HTTP.create(this.itemForm.value).subscribe((response)=>{
        // this.retrieveTutorials();
        alert(response.msg)
        this.router.navigate(['/tutorials'])
    });
    }
      // Perform the submit action here, e.g., send data to the backend
    }
  }
}
