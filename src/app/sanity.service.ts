import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private sanityClient = createClient({
    projectId: 's9bsao5g',
    dataset: 'production',
    apiVersion: '2024-08-23',
    useCdn: true,
  });

  constructor() {}

  fetchPosts(page: number, perPage: number): Promise<any> {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      "authorName": author->name,
      publishedAt
    }[${start}...${end}]`;

    return this.sanityClient.fetch(query);
  }

  fetchTotalPostsCount(): Promise<number> {
    const query = `count(*[_type == "post"])`;
    return this.sanityClient.fetch(query);
  }
}
