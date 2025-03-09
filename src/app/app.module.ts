import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer.component';
import { NavbarComponent } from './shared/components/navbar.component';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AirShipmentFormComponent } from './pages/track/air.form.component';
import { SeaShipmentFormComponent } from './pages/track/sea.form.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FadeSlideDirective } from './shared/directives/fade-slide-animation.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FooterComponent,
    NavbarComponent,
    BrowserAnimationsModule,
    AirShipmentFormComponent,
    SeaShipmentFormComponent,
    FadeSlideDirective,
    BrowserAnimationsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
