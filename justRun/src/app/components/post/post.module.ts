import { DetailPostComponent } from './detail-post/detail-post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { AllPostComponent } from './all-post/all-post.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [PostPage, DetailPostComponent, AllPostComponent],
  providers: [ PostService, UserService ]
})
export class PostPageModule {}
