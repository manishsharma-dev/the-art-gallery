import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponents } from './admin-layout-components';

describe('AdminLayoutComponents', () => {
  let component: AdminLayoutComponents;
  let fixture: ComponentFixture<AdminLayoutComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayoutComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
