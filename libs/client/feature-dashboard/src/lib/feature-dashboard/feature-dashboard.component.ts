import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@fst/client/data-access';

@Component({
  selector: 'full-stack-blog-feature-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-dashboard.component.html',
  styleUrl: './feature-dashboard.component.scss'
})
export class FeatureDashboardComponent {
  private readonly apiService = inject(ApiService);

  postItems$ = this.apiService.getAllPostItems();
}
