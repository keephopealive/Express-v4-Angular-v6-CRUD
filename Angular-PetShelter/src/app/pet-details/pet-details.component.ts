import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  pet;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this.pet = {
      name: '',
      description: '',
      type: '',
      skill1: '',
      skill2: '',
      skill3: '',
    };
    this._route.params.subscribe((params: Params) => {
      this._petService.getOnePet(params['id'])
      .subscribe(
        (pet) => {
          this.pet = pet;
        },
        (err) => { console.log(err); }
      );
    });
  }

}
