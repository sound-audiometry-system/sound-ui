import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSettingsBoxComponent } from './screen-settings-box.component';

describe('ScreenSettingsBoxComponent', () => {
  let component: ScreenSettingsBoxComponent;
  let fixture: ComponentFixture<ScreenSettingsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenSettingsBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenSettingsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
