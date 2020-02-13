import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //引入FormsModule，可以在表单中使用ngModel(双向数据绑定)
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
