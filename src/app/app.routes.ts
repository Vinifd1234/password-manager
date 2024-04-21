import { Routes } from '@angular/router';
import { SignupscreenComponent } from './pages/signupscreen/signupscreen.component';
import { HomepageComponent } from './pages/homepage/loginpage.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'signup', component: SignupscreenComponent},
    { path: '**', component: PageNotFoundComponent }
    
    ];
