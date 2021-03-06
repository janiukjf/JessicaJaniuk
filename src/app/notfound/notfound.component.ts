import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta/meta.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private meta: MetaService) { }

  ngOnInit() {
    this.meta.setTitle('404! Not Found');
  }
}
