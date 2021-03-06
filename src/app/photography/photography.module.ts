import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';

import { PhotographyComponent } from './photography.component';
import { AlbumComponent } from './album/album.component';
import { PhotographyRoutingModule } from './photography.routing.module';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumResolver } from './photography.album.resolver';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    PhotographyRoutingModule
  ],
  declarations: [
    PhotographyComponent,
    AlbumComponent,
    AlbumListComponent
  ],
  providers: [
    AlbumResolver
  ]
})
export class PhotographyModule { }
