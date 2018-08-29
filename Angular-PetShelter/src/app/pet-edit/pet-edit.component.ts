import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {
  editablePet;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
        this._petService.getOnePet(params['id'])
        .subscribe(
          (pet) => {
            this.editablePet = pet;
          },
          (err) => { console.log(err); }
        );
    });
  }

  updatePet() {
    this._petService.updatePet(this.editablePet)
    .subscribe(
      (response) => {
        this._router.navigateByUrl('/pets/' + this.editablePet._id);
      },
      (err) => { console.log(err); }
    );
  }

}
