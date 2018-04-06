import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TfService } from "./tf.service";
@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class TfjsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TfjsModule,
      providers: [TfService]
    };
  }
}
