import { Pipe, PipeTransform } from '@angular/core';
import { SanityService } from './sanity.service';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

@Pipe({
  name: 'sanityImage',
  standalone: true,
})
export class SanityImagePipe implements PipeTransform {
  constructor(private sanityService: SanityService) {}

  transform(value: SanityImageSource, width?: number): string {
    if (width) {
      return this.sanityService
        .getImageUrlBuilder(value)
        .width(width)
        .auto('format')
        .url();
    }
    return this.sanityService.getImageUrlBuilder(value).auto('format').url();
  }
}
