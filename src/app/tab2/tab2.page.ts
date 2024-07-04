import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  articles: any[] = [];

  constructor(private newsService: NewsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.newsService.getTopHeadlines().subscribe(data => {
      this.articles = data.articles;
    });
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
