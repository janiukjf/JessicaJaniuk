import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { CategoryService } from '../../services/category/category.service';
import { MetaEnum } from '../../models/MetaEnum';
import { MetaTag } from '../../models/MetaTag';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  post: Post = new Post();
  tag = '';
  id: number;
  saving = false;
  categories: Category[] = [];
  metaOptions: String[] = MetaEnum;
  public metaChoice: string = MetaEnum[0];
  public metaValue = '';

  constructor(private postService: PostService, private categoryService: CategoryService, private route: ActivatedRoute) {
    this.populatePost = this.populatePost.bind(this);
    this.populateCategories = this.populateCategories.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.removeMeta = this.removeMeta.bind(this);
    this.saveComplete = this.saveComplete.bind(this);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.categoryService.getAll().subscribe(this.populateCategories);
    this.getPost();
  }

  getPost() {
    if (this.id) {
      this.postService.getById(this.id).subscribe(this.populatePost);
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  populateCategories(data): void {
    this.categories.push.apply(this.categories, data.json().data);
  }

  populatePost(data): void {
    const post = data.json().data;
    this.post.id = post.id;
    this.post.title = post.title;
    this.post.categoryId = post.categoryId;
    this.post.content = post.content;
    this.post.published = post.published;
    this.post.publishDate = post.publishDate;
    this.post.tags = [];
    const tags = post.Tags.map(tag => tag.name);
    this.post.tags.push.apply(this.post.tags, tags);
    this.post.meta = post.Meta;
  }

  onSubmit(): void {
    if (this.id) {
      this.postService.update(this.id, this.post).subscribe(this.saveComplete);
    } else {
      this.postService.save(this.post).subscribe(this.saveComplete);
    }
  }

  saveComplete(data) {
    const response = data.json();
    this.id = response.data.id;
    this.saving = false;
  }

  addTag(): void {
    if (this.tag.trim() !== '' && !this.post.tags.find((ptag) => { return ptag.toLowerCase() === this.tag.trim().toLowerCase(); })) {
      this.post.tags.push(this.tag.trim());
    }
    this.tag = '';
  }

  removeTag(tag): void {
    const ix = this.post.tags.findIndex((ptag) => { return ptag === tag; });
    if (ix > -1) {
      this.post.tags.splice(ix, 1);
    }
  }

  addMeta(): void {
    if (this.metaChoice.trim() !== '' && this.metaValue.trim() !== '') {
      this.post.meta.push(new MetaTag(this.metaChoice, this.metaValue));
    }
    this.metaChoice = MetaEnum[0];
    this.metaValue = '';
  }

  removeMeta(meta): void {
    const ix = this.post.meta.findIndex((mtag) => { return mtag === meta; });
    if (ix > -1) {
      this.post.meta.splice(ix, 1);
    }
  }
}
