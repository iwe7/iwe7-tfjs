import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { Add1dComponent } from './add-1d/add-1d.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Add2dComponent } from './add-2d/add-2d.component';
import { Add3dComponent } from './add-3d/add-3d.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [Add1dComponent, Add2dComponent, Add3dComponent]
})
export class PagesModule { }
