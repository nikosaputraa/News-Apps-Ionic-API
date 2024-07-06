import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  categories = ['entertainment', 'health', 'sports', 'technology'];
  selectedCategory = 'entertainment';
  articles: any[] = [];

  constructor(private newsService: NewsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getCategoryNews();
  }

  searchNews(event: CustomEvent) {
    const query = (event.target as HTMLInputElement).value;
    if (query && query.trim() !== '') {
      this.newsService.searchNews(query).subscribe((data: any) => {
        this.articles = data.articles;
      });
    } else {
      // Jika input pencarian kosong, kembalikan ke berita teratas
      this.newsService.getTopHeadlines().subscribe(data => {
        this.articles = data.articles;
      });
    }
  }
  
  getCategoryNews() {
    this.newsService.getCategoryNews(this.selectedCategory).subscribe(data => {
      this.articles = data.articles;
    });
  }

  onCategoryChange() {
    this.getCategoryNews();
  }

  async save(article: any) {
    let storedFav = localStorage.getItem('fav');
    let favorites = storedFav ? JSON.parse(storedFav) : [];
    
    // Check if article already exists in favorites
    let existingIndex = favorites.findIndex((fav: any) => fav.article && fav.article.title === article.title);
    if (existingIndex === -1) {
      // Store only necessary properties
      let favoriteItem = {
        article: {
          title: article.title,
          description: article.description,
          urlToImage: article.urlToImage,
          url: article.url
        },
        timestamp: new Date().toISOString()  // Store current timestamp
      };
      favorites.push(favoriteItem);
      localStorage.setItem('fav', JSON.stringify(favorites));
  
      // Update favorites in Tab4Page
      if (this.newsService.tab4PageInstance) {
        this.newsService.tab4PageInstance.favorites = favorites;
      }

      // Menampilkan alert
      const alert = await this.alertController.create({
        header: 'Success!',
        message: 'Artikel sukses ditambahkan ke Favorit.',
        buttons: ['Oke'],
        mode: 'ios'
      });

      await alert.present();
      
      console.log('Favorite added:', article);
    } else {
      const alert = await this.alertController.create({
        header: 'Oops!',
        message: 'Artikel ini sudah ada di dalam Favorit Anda.',
        buttons: ['Oke'],
        mode: 'ios'
      });

      await alert.present();
      
      console.log('Article already in favorites.');
    }
  }
}
