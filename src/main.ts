import { bootstrapApplication } from '@angular/platform-browser';
import { HomepageComponent } from './app/pages/homepage/loginpage.component';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
