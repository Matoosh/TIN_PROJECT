import {NgModule} from '@angular/core';
import { 
  NbAccordionModule,
  NbActionsModule, 
  NbButtonModule, 
  NbCardModule, 
  NbContextMenuModule, 
  NbDatepickerModule, 
  NbIconModule, 
  NbInputModule, 
  NbLayoutModule, 
  NbListModule, 
  NbRadioModule, 
  NbSelectModule, 
  NbSidebarModule, 
  NbSidebarService, 
  NbThemeService, 
  NbTreeGridModule, 
  NbUserModule, 
  NbWindowModule,
  NbWindowService} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
// import { NbAuthService, NbTokenService, NbTokenStorage } from '@nebular/auth';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  exports: [
    NbLayoutModule,
    NbActionsModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTreeGridModule,
    NbUserModule,
    NbListModule,
    NbCardModule,
    NbAccordionModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NbWindowModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbButtonModule
  ],
  providers: [
    NbThemeService,
    NbSidebarService,
    // NbAuthService,
    // NbTokenService,
    NbWindowService],
})
export class NebularThemeModule {}