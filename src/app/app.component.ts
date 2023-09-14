import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoApp';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en'); // Set the default language
  }
  changeLanguage(lang: string) {
    this.translate.use(lang); // Change the current language
  }
}
