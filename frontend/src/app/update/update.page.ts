import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZapatillasService } from '../services/zapatillas.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  updateZapatillas: FormGroup;
  id: any;

  constructor(
    private zapatillasService: ZapatillasService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.fetchZapatillas(this.id);
    this.updateZapatillas = this.formBuilder.group({
      marca: [""],
      numero: [""],
      stock: [""]
    })
  }

  fetchZapatillas(id){
    this.zapatillasService.getZapatillaById(id).subscribe((data)=>{
      this.updateZapatillas.setValue({
        marca: data["marca"],
        numero: data["numero"],
        stock: data["stock"]
      });
    });
  }

  onSubmit(){
    if(!this.updateZapatillas.valid){
      return false;
    } else{
      this.zapatillasService.updateZapatilla(this.id, this.updateZapatillas.value).subscribe(()=>{
        this.updateZapatillas.reset();
        this.router.navigate(["/list"]);
      })
      
    }
  }

}
