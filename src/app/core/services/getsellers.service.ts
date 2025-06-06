import { HttpClient } from '@angular/common/http'
import {inject, Injectable} from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { ISeller } from '../interfaces/iseller'
import { ResponceGetAll } from '../../models/ResponceGetAll.model';
import { Responce } from '../../models/Responce.model';


@Injectable({
  providedIn: 'root'
})
export class GetsellersService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient)

  getAllSellers():Observable<ResponceGetAll<ISeller>>
  {
return this._HttpClient.get<ResponceGetAll<ISeller>>(`${environment.apiBaseUrl}/Seller`)
  }

getSellerWithItsProducts(id:string):Observable<Responce<ISeller>>
{
  return this._HttpClient.get<Responce<ISeller>>(`${environment.apiBaseUrl}/Seller/${id}`)
} 

}
