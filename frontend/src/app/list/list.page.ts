import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZapatillasService } from '../services/zapatillas.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  Zapatillas: any = [];

  constructor(private zapatillasService: ZapatillasService, 
              private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.zapatillasService.getZapatillas().subscribe((response) => {
      this.Zapatillas = response;
    })
  }

  removeZapatilla(zapatillas, i){
    if(window.confirm("Are you sure")){
      this.zapatillasService.deleteZapatilla(zapatillas.id).subscribe(()=>{
        this.ionViewDidEnter();
        console.log("Zapatilla deleted!")
      })
    }
  }

}
