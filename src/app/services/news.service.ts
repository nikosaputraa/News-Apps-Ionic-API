import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tab4Page } from '../tab4/tab4.page';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'your_api_news_key';
  private apiUrl = 'https://newsapi.org/v2/top-headlines';

  tab4PageInstance: Tab4Page | null = null;

  constructor(private http: HttpClient) { }

  getTopHeadlines(country: string = 'us'): Observable<any> {
    return this.http.get(`${this.apiUrl}?country=${country}&apiKey=${this.apiKey}`);
  }

  getCategoryNews(category: string, country: string = 'us'): Observable<any> {
    return this.http.get(`${this.apiUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`);
  }

  searchNews(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${query}&apiKey=${this.apiKey}`);
  }
}
