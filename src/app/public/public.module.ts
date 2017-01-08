import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { BlogModule } from '../blog/blog.module';
import { PhotographyModule } from '../photography/photography.module';
import { HomeComponent }        from '../home/home.component';
import { AboutComponent }       from '../about/about.component';
import { ConnectComponent }     from '../connect/connect.component';
import { R2d2Component } from '../r2d2/r2d2.component';
import { PublicRoutingModule } from './public.routing.module';
import { NavigationComponent } from '../navigation/navigation.component';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    BlogModule,
    PhotographyModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    AboutComponent,
    ConnectComponent,
    R2d2Component,
    NavigationComponent
  ]
})
export class PublicModule { }