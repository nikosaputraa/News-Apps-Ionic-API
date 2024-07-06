import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { AlertController } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  articles: any[] = [];
  featuredArticle: any;
  darkModeEnabled: boolean = false;

  constructor(
    private newsService: NewsService, 
    private alertController: AlertController,
    private themeService: ThemeService
  ) {}

  toggleDarkMode(event: CustomEvent) {
    const darkModeEnabled = event.detail.checked;
    this.themeService.setDarkMode(darkModeEnabled);
  }

  searchNews(event: CustomEvent) {
    const query = (event.target as HTMLInputElement).value;
    if (query && query.trim() !== '') {
      this.newsService.searchNews(query).subscribe((data: any) => {
        this.articles = data.articles; // Mengganti articles dengan hasil pencarian
        this.featuredArticle = this.articles.length ? this.articles[0] : null; // Mengganti featuredArticle jika diperlukan
      });
    } else {
      // Jika input pencarian kosong, kembalikan ke berita teratas
      this.newsService.getTopHeadlines().subscribe(data => {
        this.articles = data.articles;
        this.featuredArticle = this.articles.length ? this.articles[0] : null;
      });
    }
  }
  
  ngOnInit() {
    this.darkModeEnabled = this.themeService.isDarkMode();

    this.newsService.getTopHeadlines().subscribe(data => {
      this.articles = data.articles;
      this.featuredArticle = this.articles.length ? this.articles[0] : null;
    });
  }

  truncateDescription(description: string, limit: number): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }

  truncateTitle(title: string, limit: number): string {
    return title.length > limit ? title.substring(0, limit) + '...' : title;
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

      // Auto-dismiss setelah 2 detik
      // setTimeout(() => {
      //   alert.dismiss();
      // }, 2000);

      
      console.log('Favorite added:', article);
    } else {
      const alert = await this.alertController.create({
        header: 'Oops!',
        message: 'Artikel ini sudah ada di dalam Favorit Anda.',
        buttons: ['OK'],
        mode: 'ios'
      });

      await alert.present();
      
      console.log('Article already in favorites.');
    }
  }

  async saveFeatured(featuredArticle: any) {
    let storedFav = localStorage.getItem('fav');
    let favorites = storedFav ? JSON.parse(storedFav) : [];
    
    // Check if article already exists in favorites
    let existingIndex = favorites.findIndex((fav: any) => fav.article && fav.article.title === featuredArticle.title);
    if (existingIndex === -1) {
      // Store only necessary properties
      let favoriteItem = {
        article: {
          title: featuredArticle.title,
          description: featuredArticle.description,
          urlToImage: featuredArticle.urlToImage,
          url: featuredArticle.url
        },
        dt_txt: new Date().toISOString()  // Store current timestamp
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

      // Auto-dismiss setelah 2 detik
      // setTimeout(() => {
      //   alert.dismiss();
      // }, 2000);

      
      console.log('Favorite added:', featuredArticle);
    } else {
      const alert = await this.alertController.create({
        header: 'Oops!',
        message: 'Artikel ini sudah ada di dalam Favorit Anda.',
        buttons: ['OK'],
        mode: 'ios'
      });

      await alert.present();
      
      console.log('Article already in favorites.');
    }
  }
  
  
}
