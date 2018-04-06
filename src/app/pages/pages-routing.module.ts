import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Add1dComponent } from './add-1d/add-1d.component';

const routes: Routes = [{
  path: '',
  component: Add1dComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
