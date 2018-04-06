import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Add1dComponent } from "./add-1d/add-1d.component";
import { Add2dComponent } from "./add-2d/add-2d.component";
import { Add3dComponent } from './add-3d/add-3d.component';
import { ShuangseqiuComponent } from './shuangseqiu/shuangseqiu.component';

const routes: Routes = [
  {
    path: "",
    component: ShuangseqiuComponent
  },
  {
    path: "add3d",
    component: Add3dComponent
  },
  {
    path: "add2d",
    component: Add2dComponent
  },
  {
    path: "add1d",
    component: Add1dComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
