import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private _http: HttpClient) { }

  getPet() {
    console.log("Angular > PetService > getPets()");
    return this._http.get('/api/pets');
  }

  createPet(newPet) {
    return this._http.post('/api/pets', newPet);
  }

  getOnePet(id){
    return this._http.get('/api/pets/' + id);
  }

  updatePet(editablePet){
    return this._http.put('/api/pets/' + editablePet._id, editablePet);
  }

  deletePet(id){
    return this._http.delete('/api/pets/' + id);
  }

}
