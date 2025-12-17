import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PallasService } from '../../../service/pallasService';
import { IPallas } from '../../../model/pallas';
import { DatePipe } from '@angular/common'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { IPage } from '../../../model/plist';

@Component({
  selector: 'app-pallas-view',
  standalone: true, 
  imports: [
    RouterLink, // Para que funcionen los botones de volver/editar
    DatePipe // Para que funcione el formateo de fecha | date
    ,
    Paginacion
],
  templateUrl: './pallas-preview.html',
  styleUrl: './pallas-preview.css',
})
export class PallasPreview implements OnInit {

  // INYECCIÓN DE DEPENDENCIAS
  private route = inject(ActivatedRoute);
  private oPallasService = inject(PallasService);
  oPage: IPage<IPallas> | null = null; // Página de datos
  

  // VARIABLES DE ESTADO
  id: number = 0;
  arrPallas: IPallas[] = [];
  strResult: string = "";
  nPage: number = 0;
  nRpp: number = 5;

  loadPreview() {
    this.oPallasService.getPage(this.nPage,this.nRpp).subscribe({
       next: (data) => {
    // Filtramos solo los que están publicados
    this.arrPallas = data.content.filter(nota => nota.publicado);
  },
  error: (err) => this.strResult = 'No se pudieron cargar las notas'
});
  }
  
  ngOnInit() {
    this.loadPreview();
  }

  getPage() {
    this.oPallasService.getPage(this.nPage, this.nRpp,'id','asc').subscribe({
      next: (data: IPage<IPallas>) => {
        this.oPage = data;

        // Comprobación de seguridad
        if (this.nPage > 0 && this.nPage >= data.totalPages) {
          this.nPage = data.totalPages - 1;
          this.getPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.strResult = "Error al cargar: " + error.message;
        console.error(error);
      }
    });
  }

 onSetPage(nPage: number) {
    this.nPage = nPage;
    this.getPage();
  }


  onSetRpp(nRpp: number) {
    this.nRpp = nRpp;
    this.getPage();
  }
  
}