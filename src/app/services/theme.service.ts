import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeKey = 'darkModeEnabled';
  private darkModeEnabled = false;

  constructor() {
    // Load dark mode status from localStorage on initialization
    const storedValue = localStorage.getItem(this.darkModeKey);
    this.darkModeEnabled = storedValue ? JSON.parse(storedValue) : false;
    this.applyTheme(); // Apply theme initially
  }

  isDarkMode(): boolean {
    return this.darkModeEnabled;
  }

  setDarkMode(enabled: boolean): void {
    this.darkModeEnabled = enabled;
    localStorage.setItem(this.darkModeKey, JSON.stringify(enabled));
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = document.getElementsByTagName('body')[0];
    if (this.darkModeEnabled) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
