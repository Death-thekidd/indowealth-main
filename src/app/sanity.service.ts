import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';
import { Observable, from, map, BehaviorSubject } from 'rxjs';

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

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  private setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  fetchPosts(page: number, perPage: number): Promise<any> {
    this.setLoading(true);
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

    return this.sanityClient.fetch(query).finally(() => this.setLoading(false));
  }

  fetchTotalPostsCount(): Promise<number> {
    this.setLoading(true);
    const query = `count(*[_type == "post"])`;
    return this.sanityClient.fetch(query).finally(() => this.setLoading(false));
  }

  getHomeData(): Observable<any> {
    this.setLoading(true);
    return from(
      this.sanityClient.fetch(
        `*[_type == "home"]{..., "heroBgUrl": heroBg.asset->url, "heroSmallUrl": heroSmallBg.asset->url}`
      )
    ).pipe(
      map((data: any) => data[0]),
      map((data) => {
        this.setLoading(false);
        return data;
      })
    );
  }

  getAboutData(): Observable<any> {
    this.setLoading(true);
    return from(
      this.sanityClient.fetch(
        `*[_type == "about"]{..., "heroBgUrl": heroBg.asset->url, "heroSmallUrl": heroSmallBg.asset->url}`
      )
    ).pipe(
      map((data: any) => data[0]),
      map((data) => {
        this.setLoading(false);
        return data;
      })
    );
  }

  getTradingData(): Observable<any> {
    this.setLoading(true);
    return from(
      this.sanityClient.fetch(
        `*[_type == "token"]{..., "heroBgUrl": heroBg.asset->url, "heroSmallUrl": heroSmallBg.asset->url}`
      )
    ).pipe(
      map((data: any) => data[0]),
      map((data) => {
        this.setLoading(false);
        return data;
      })
    );
  }

  getMissionData(): Observable<any> {
    this.setLoading(true);
    return from(
      this.sanityClient.fetch(
        `*[_type == "mission"]{..., "heroBgUrl": heroBg.asset->url, "heroSmallUrl": heroSmallBg.asset->url}`
      )
    ).pipe(
      map((data: any) => data[0]),
      map((data) => {
        this.setLoading(false);
        return data;
      })
    );
  }

  getVisionData(): Observable<any> {
    this.setLoading(true);
    return from(
      this.sanityClient.fetch(
        `*[_type == "vision"]{..., "heroBgUrl": heroBg.asset->url, "heroSmallUrl": heroSmallBg.asset->url}`
      )
    ).pipe(
      map((data: any) => data[0]),
      map((data) => {
        this.setLoading(false);
        return data;
      })
    );
  }
}
