import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { TreeModule } from 'angular-tree-component';
import { ClarityModule } from "clarity-angular";

import { AppComponent } from './app.component';
import { NodesService } from "app/services/nodes.service";
import { reducer } from "app/reducers";
import { TreeDataEffects } from 'app/common/effects/tree-data.effect';
import { UpdateModalComponent } from './components/dialog/update-modal.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';

const reducers = { state: reducer };

@NgModule({
  declarations: [
    AppComponent,
    UpdateModalComponent,
    ActionBarComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    FormsModule,
    HttpModule,
    TreeModule,
    BrowserAnimationsModule,
    EffectsModule.run(TreeDataEffects),
    StoreModule.provideStore(reducers)
  ],
  providers: [NodesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
