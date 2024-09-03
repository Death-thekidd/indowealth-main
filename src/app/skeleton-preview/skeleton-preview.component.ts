import { Component } from '@angular/core';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';

@Component({
  selector: 'spartan-skeleton-preview',
  standalone: true,
  imports: [HlmSkeletonComponent],
  template: `
    <div
      class="flex flex-col md:flex-row bg-white dark:bg-card rounded-lg shadow-lg overflow-hidden w-full card h-[40rem]"
    >
      <div class="relative md:w-1/2">
        <hlm-skeleton class="w-full h-full object-cover"></hlm-skeleton>
      </div>
      <div
        class="md:w-1/2 px-6 py-8 bg-indo text-white flex flex-col justify-between"
      >
        <div class="space-y-2 mb-6">
          <hlm-skeleton class="h-4 w-[250px]"></hlm-skeleton>
          <hlm-skeleton class="h-4 w-[200px]"></hlm-skeleton>
        </div>
        <div class="flex justify-end">
          <hlm-skeleton class="h-10 w-[100px] rounded-lg"></hlm-skeleton>
        </div>
      </div>
    </div>
  `,
})
export class SkeletonPreviewComponent {}
