import { Pipe, PipeTransform } from '@angular/core';
import { SanityService } from './sanity.service';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

@Pipe({
  name: 'sanityImage',
  standalone: true,
})
export class SanityImagePipe implements PipeTransform {
  constructor(private sanityService: SanityService) {}

  transform(value: SanityImageSource, width?: number): string | null {
    // Check if the value is null or undefined
    if (!value) {
      console.warn('SanityImagePipe: No image source provided');
      return null; // Return null or a placeholder image URL
    }

    // Generate the image URL
    const builder = this.sanityService.getImageUrlBuilder(value);
    if (width) {
      return builder.width(width).auto('format').url();
    }
    return builder.auto('format').url();
  }
}
