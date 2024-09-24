import { Pipe, PipeTransform } from '@angular/core';
import { SanityImagePipe } from './sanity-image.pipe';
import {
  PortableTextComponents,
  toHTML,
  uriLooksSafe,
} from '@portabletext/to-html';
import { PortableTextBlock } from '@portabletext/types';
import htm from 'htm';
import vhtml from 'vhtml';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const html = htm.bind(vhtml);

@Pipe({
  name: 'portableText',
  standalone: true,
})
export class PortableTextPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer,
    private sanityImagePipe: SanityImagePipe,
  ) {}

  components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: string }) =>
        '<img src="' + this.sanityImagePipe.transform(value, 900) + '" />',
    },
    marks: {
      link: ({ children, value }) => {
        const href = value.href || '';

        if (uriLooksSafe(href)) {
          const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
          return `<a style="color: #da9915" href="${href}" target="_blank" rel="${rel}">${children}</a>`;
        }

        return children;
      },
    },
  };

  transform(value: PortableTextBlock[]): SafeHtml {
    const htmlString = toHTML(value, { components: this.components });
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
}
