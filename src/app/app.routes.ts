import {Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {RecoveryComponent} from './pages/recovery/recovery.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {UserInfoComponent} from './pages/user-info/user-info.component';
import {UserStatisticaComponent} from './pages/user-statistica/user-statistica.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path:'authorization', component: AuthorizationComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'recovery', component: RecoveryComponent},
  {path:'user-info', component: UserInfoComponent},
  {path:'user-statistica', component: UserStatisticaComponent},
  {path:'admin-panel', component: AdminPanelComponent},
];
