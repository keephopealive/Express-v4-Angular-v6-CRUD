import { PetEditComponent } from './pet-edit/pet-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { PetNewComponent } from './pet-new/pet-new.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pets' },
  { path: 'pets', component: PetListComponent },
  { path: 'pets/new', component: PetNewComponent },
  { path: 'pets/:id/edit', component: PetEditComponent },
  { path: 'pets/:id', component: PetDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
