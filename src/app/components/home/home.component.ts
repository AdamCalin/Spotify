import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({ 
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading:boolean;
  error:boolean;
  mensajeError:string = "";
  constructor(private spotify: SpotifyService) {   
    this.loading= false;
    this.error = false;
    this.spotify.getNewReleases().subscribe( (data:any) => {
      this.nuevasCanciones = data;
      
    }, (errorServicio) => {
      this.loading = false;
        this.error = true;
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
    });
  }

  ngOnInit(): void {
  }

}
