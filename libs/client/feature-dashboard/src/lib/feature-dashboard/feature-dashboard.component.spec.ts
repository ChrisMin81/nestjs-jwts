import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureDashboardComponent } from './feature-dashboard.component';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureDashboardComponent', () => {
  let component: FeatureDashboardComponent;
  let fixture: ComponentFixture<FeatureDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FeatureDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
