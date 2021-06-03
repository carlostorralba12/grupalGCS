import { DetailPostComponent } from './detail-post/detail-post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { AllPostComponent } from './all-post/all-post.component';
import { MenuModule } from '../menu/menu.module';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [DetailPostComponent, AllPostComponent, AddPostComponent, EditPostComponent],
  exports: [
    DetailPostComponent, 
    AllPostComponent, 
    AddPostComponent, 
    EditPostComponent
  ],
  providers: [ PostService, UserService ]
})
export class PostPageModule {}
