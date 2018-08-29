import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets;

  constructor(private _petService: PetService) { }

  ngOnInit() {
    this.pets = [];
    this.getPets();
  }

  getPets() {
    this._petService.getPet()
    .subscribe(
      (pets) => {
        this.pets = pets;
      },
      (err) => { console.log(err); }
    );
  }

  deletePet(id) {
    this._petService.deletePet(id)
    .subscribe(
      (response) => {
        this.getPets();
      },
      (err) => { console.log(err); }
    );
  }

}
