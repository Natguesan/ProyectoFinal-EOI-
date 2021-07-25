import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InicioComponent } from './components/Home/inicio.component';
import { TabernaComponent } from './components/nuestra-dimension/taberna/taberna.component';
import { SalasComponent } from './components/nuestra-dimension/salas/salas.component';
import { DondeEstamosComponent } from './components/encuentranos/donde-estamos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RedesComponent } from './components/redes/redes.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ReservarSalaComponent } from './components/reservas/reservar-sala/reservar-sala.component';
import { ReservarMesaComponent } from './components/reservas/reservar-mesa/reservar-mesa.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/sub-components/navbar/navbar.component';
import { FooterComponent } from './components/sub-components/footer/footer.component';
import { StickyNavModule } from 'ng2-sticky-nav';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './components/register/register.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';


export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  
  declarations: [
    AppComponent,
    InicioComponent,
    TabernaComponent,
    SalasComponent,
    DondeEstamosComponent,
    ContactoComponent,
    RedesComponent,
    ReservasComponent,
    ReservarSalaComponent,
    ReservarMesaComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    EventosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    StickyNavModule, 
    MaterialModule ,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
