import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private http: HttpService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [''],
      message: ['', Validators.required],
    });
  }


  ngOnInit() {
  }

  onClickSubmit(formData) {
    console.log(formData);
    this.submitted = true;
    this.http.post(formData);
  }

}
