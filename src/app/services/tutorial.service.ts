import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'https://ap.greatfuturetechno.com/';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl+'party/',{headers : {Authorization : `Token ${localStorage.getItem('token')}`}});
  }

  get(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}party/?id=${id}`,{headers : {Authorization : `Token ${localStorage.getItem('token')}`}});
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+'party/', data,{headers : {Authorization : `Token ${localStorage.getItem('token')}`}});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}party/?id=${id}`, data,{headers : {Authorization : `Token ${localStorage.getItem('token')}`}});
  }

  delete(id: any): Observable<any> {
    console.log(id)
    return this.http.delete(`${baseUrl+'party/?id='}${id}`,{headers : {Authorization : `Token ${localStorage.getItem('token')}`}});
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
  
  logout(data: any): Observable<any> {
    return this.http.post(baseUrl+'logout/', data,{headers : {Authorization : `Token ${localStorage.getItem('token')}`}});
  }
}
