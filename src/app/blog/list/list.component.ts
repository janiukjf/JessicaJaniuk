import { Component, OnInit } from '@angular/core';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';
import { MetaService } from '../../services/meta/meta.service';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  posts: Post[] = [];
  now: Date = new Date();
  show = false;
  page = 1;
  pages = 1;
  perPage = 5;
  totalPosts = 0;
  title = 'Blog';

  constructor(private postService: PostService, private meta: MetaService, private route: ActivatedRoute, private fullUrl: FullUrlService) {
    this.populatePosts = this.populatePosts.bind(this);
    this.processRoute = this.processRoute.bind(this);
    this.title = route.snapshot.data['title'];
  }

  ngOnInit() {
    this.meta.setTitle(this.route.snapshot.data['title']);
    this.meta.setTag({ property: 'og:title', content: 'Blog' });
    this.meta.setTag({ property: 'og:description', content: 'Jessica Janiuk\'s Personal Blog' });
    this.meta.setTag({ property: 'og:url', content: this.fullUrl.url() });
    this.route.params.subscribe(this.processRoute);
  }

  processRoute(params) {
    this.page = (params && params.page) ? Number(params.page) : 1;
    this.postService.getAllPublishedByCategory(this.route.snapshot.data['category'], this.page, this.perPage).subscribe(this.populatePosts);
  }

  populatePosts(data) {
    this.posts = [];
    const response = data.json().data;
    this.totalPosts = response.count;
    response.posts.forEach((post) => {
      const pst = new Post(post);
      this.posts.push(pst);
    });
    this.setPages();
    this.show = true;
  }

  setPages() {
    this.pages = Math.ceil(this.totalPosts / this.perPage);
  }
}
