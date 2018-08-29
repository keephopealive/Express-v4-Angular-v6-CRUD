import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-pet-new',
  templateUrl: './pet-new.component.html',
  styleUrls: ['./pet-new.component.css']
})
export class PetNewComponent implements OnInit {
  newPet;
  titleError;
  descriptionError;
  typeError;

  constructor(
    private _petService: PetService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newPet = {
      name: '',
      type: '',
      description: '',
      skill1: '',
      skill2: '',
      skill3: '',
    };
  }

  createPet() {
    this._petService.createPet(this.newPet)
      .subscribe(
        (response) => {
          if (response['status']) {
            this._router.navigateByUrl('/pets');
          } else {
            console.log(response['error']['errors']);
            if (response['error']['errors']['description']) { 
              this.descriptionError = response['error']['errors']['description']; 
            } else {
              this.descriptionError = '';
            }

          }
        },
        (err) => { console.log(err); }
      );

  }

}
