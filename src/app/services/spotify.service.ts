import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
   }
    getQuery(query:string){
      const url = `https://api.spotify.com/v1/${query}`;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer BQDTkdYUera3h0Mksk1xw-VHp94H85i4ttyHMuQxj_39mN5rFmIUZwp1Q7tLTq3PuFnhFm2mEOEr2UstpMo'
        });
          return this.http.get(url, {headers});
    } 

   getNewReleases(){
    return this.getQuery('browse/new-releases').
      pipe(map( (data:any) =>data['albums'].items));
       }

   getArtistas(termino:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
          .pipe(map( (data:any) => data['artists'].items));
     }

    getArtista(id:string){
      return this.getQuery(`artists/${ id }`);
          //.pipe(map( (data:any) =>data['artists'].items));
    }
    getTopTracks(id:string){
      return this.getQuery(`artists/${id}/top-tracks?country=us`)
          .pipe(map( (data:any) =>data['tracks']));
    }
}
