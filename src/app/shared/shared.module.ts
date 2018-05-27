// angular modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
// package modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ColorPickerModule } from 'ngx-color-picker'
import { PapaParseModule } from 'ngx-papaparse'
// local modules
import { MaterialModule } from './material.module'
// components
import { SidenavComponent } from './sidenav/sidenav.component'
import { MailingListDialog } from './mailing-list-dialog/mailing-list.dialog'
import { ViewListDialog } from '#app/shared/view-list-dialog/view-list.dialog'
import { ContextMenuModule } from 'ngx-contextmenu'
import { ColorsComponent } from '#app/shared/colors/colors.component'

const modules = [
  CommonModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgbModule,
  ColorPickerModule,
  PapaParseModule,
  MaterialModule,
  ContextMenuModule
]

const components = [
  SidenavComponent, 
  ColorsComponent,
]

const dialogs = [
  MailingListDialog,
  ViewListDialog
]

@NgModule({
  imports: modules,
  declarations: [...components, ...dialogs],
  exports: [...modules, ...components, ...dialogs]
})
export class SharedModule {}
