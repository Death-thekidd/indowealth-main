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

const html = htm.bind(vhtml);

@Pipe({
  name: 'portableText',
  standalone: true,
})
export class PortableTextPipe implements PipeTransform {
  constructor(private sanityImagePipe: SanityImagePipe) {}

  components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: string }) =>
        '<img src="' + this.sanityImagePipe.transform(value, 900) + '" />',
    },
    marks: {
      link: ({ children, value }) => {
        // ⚠️ `value.href` IS NOT "SAFE" BY DEFAULT ⚠️
        // ⚠️ Make sure you sanitize/validate the href! ⚠️
        const href = value.href || '';

        if (uriLooksSafe(href)) {
          const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
          return `<a style="color: #da9915" href="${href}" target="_blank" rel="${rel}">${children}</a>`;
        }

        // If the URI appears unsafe, render the children (eg, text) without the link
        return children;
      },
    },
  };
  transform(value: PortableTextBlock[]): string {
    return toHTML(value, { components: this.components });
  }
}
