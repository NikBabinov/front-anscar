import {Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {RecoveryComponent} from './pages/recovery/recovery.component';
import {RegistrationComponent} from './pages/registration/registration.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path:'authorization', component: AuthorizationComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'recovery', component: RecoveryComponent},
];
