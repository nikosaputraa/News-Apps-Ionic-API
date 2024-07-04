import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page {

  public favorites: any[] = [];

  constructor(private alertController: AlertController) {
  }

  ionViewDidEnter() {
    const storedFav = localStorage.getItem('fav');
    if (storedFav !== null) {
      this.favorites = JSON.parse(storedFav);
      console.log(this.favorites);
    }
  }

  getFormattedDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  }

  async clearFavorites() {
    

    const alert = await this.alertController.create({
      header: 'Confirm Delete!',
      message: `Apakah ingin menghapus semua artikel dari Favorites?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'OK',
          handler: () => {
            localStorage.removeItem('fav');
            this.favorites = [];
          }
        }
      ],
      mode: 'ios'
    });

    await alert.present();
  }

  async removeFromFavorites(favorite: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete!',
      message: `Apakah ingin menghapus artikel ini dari Favorites?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'OK',
          handler: () => {
            // Find index of the favorite to remove
            const index = this.favorites.findIndex(fav => fav.article.title === favorite.article.title);
            if (index !== -1) {
              // Remove from favorites array
              this.favorites.splice(index, 1);
              // Update localStorage
              localStorage.setItem('fav', JSON.stringify(this.favorites));
            }
          }
        }
      ],
      mode: 'ios'
    });

    await alert.present();
  }
}