import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ZapatillasService } from './../services/zapatillas.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  zapatillaForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private zapatillasService: ZapatillasService    
  ) {
    this.zapatillaForm = this.formBuilder.group({
      marca: [''],
      numero: [''],
      stock: ['']
    })
  }

  ngOnInit() { }

  onSubmit() {
    if (!this.zapatillaForm.valid) {
      return false;
    } else {
      this.zapatillasService.createZapatillaUsingJSON(this.zapatillaForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.zapatillaForm.reset();
            this.router.navigate(['/list']);
          })
        });
    }
  }

}