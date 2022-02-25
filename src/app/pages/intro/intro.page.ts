import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { INTRO_KEY } from '../../guards/intro.guard';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {}

  next() {
    this.slides.slideNext();
  }
  async start() {
    await this.storage.set(INTRO_KEY, true);
    console.log(await this.storage.get(INTRO_KEY));
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
