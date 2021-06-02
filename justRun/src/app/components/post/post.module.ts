import { DetailPostComponent } from './detail-post/detail-post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PostPage, DetailPostComponent],
  providers: [ PostService, UserService ]
})
export class PostPageModule {}
