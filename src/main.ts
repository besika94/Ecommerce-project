import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app/app.component';
import { routes } from './app/routes';
import { providePrimeNG } from 'primeng/config';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule, ReactiveFormsModule, MatSnackBarModule),
    providePrimeNG({
      ripple: true,
    }),
  ],
}).catch((err) => console.error(err));
