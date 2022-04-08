import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent {

  artista:any = {};
  loadingArtist: boolean;
  topTracks:any[] = [];
  loading:boolean;
  // uri:string = this.topTracks[16].split(":", 3);
  constructor( private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loadingArtist = true; 
    this.loading = false;
    this.router.params.subscribe( params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id:string){
    
    this.spotify.getArtista(id).subscribe( artista => {
      this.loadingArtist  = true;
      //console.log(artista);
      this.artista = artista;
      this.loadingArtist = false;
    });
  }
  getTopTracks(id:string){
    this.spotify.getTopTracks(id).subscribe( topTracks => {
       //console.log(topTracks);
       this.topTracks = topTracks;
       this.loading = true;
      
    })
  }

}
