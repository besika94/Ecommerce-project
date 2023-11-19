import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ServiceForHome } from './services/home/home.service';
import { NgwWowService } from 'ngx-wow';

describe('AppComponent', () => {
  let component: AppComponent;
  const homeServiceSpy = jasmine.createSpyObj<ServiceForHome>(
    'ServiceForHome',
    ['getAllProducts']
  );
  const wowServiceSpy = jasmine.createSpyObj<NgwWowService>('NgwWowService', [
    'init',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: ServiceForHome, useValue: homeServiceSpy },
        { provide: NgwWowService, useValue: wowServiceSpy },
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
