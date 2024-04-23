import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { DBConfig, NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { CookieService } from 'ngx-cookie-service';


const dbConfig: DBConfig = {
  name: 'db',
  version: 1,
  objectStoresMeta: [{
      store: 'passwords',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'category', keypath: 'category', options: { unique: false } },
          { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
          { name: 'password', keypath: 'password', options: { unique: false } }
      ]
  }]
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig),
    CookieService)
  ], 
};