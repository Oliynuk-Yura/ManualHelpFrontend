import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectMessagesService } from './directmessages.service';
import { FooterComponent } from '../shared/loyout/footer/footer.component';
import { HeaderComponent } from '../shared/loyout/header/header.component';
import { PrivateMessageComponent } from '../private-message/private-message/private-message.component';
import { DirectMessagesRoutes } from './directmessages.routes';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DirectMessagesEffects } from './store/directmessages.effects';
import { directMessagesReducer } from './store/directmessages.reducer';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        DirectMessagesRoutes,
        StoreModule.forFeature('dm', directMessagesReducer),
        EffectsModule.forFeature([DirectMessagesEffects]),
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatChipsModule,
        ReactiveFormsModule
    ],

    declarations: [
        PrivateMessageComponent,
        FooterComponent,
        HeaderComponent
    ],

    providers: [
        DirectMessagesService
    ],

    exports: [
       // PrivateMessageComponent
    ]
})

export class DirectMessagesModule { }
