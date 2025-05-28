import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private apiUrl = 'https://handmademarket.runasp.net/api/WishList';

  constructor(private http: HttpClient) {}

addToWishlist(productId: number): Observable<any> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User not authenticated. Token not found.');
  }

  const decodedToken: any = jwtDecode(token); 

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post(`${this.apiUrl}/${ productId }`, { headers });
}
}
