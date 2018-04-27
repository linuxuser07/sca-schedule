import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {ScheduleComponent} from './schedule/schedule.component';
import {importExpr} from '@angular/compiler/src/output/output_ast';


const routes: Routes =[
  {path: 'schedule', component: ScheduleComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {}
