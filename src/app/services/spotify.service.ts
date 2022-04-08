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
        'Authorization': 'Bearer BQDPwV5A42hnjb-pvzsjbqSxOUNnDqfNH_8dbjBa1mX_MCSL5NDM5SK3Q2woSgZ-xL4WT3MZ1J0OFcxkTxw'
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
