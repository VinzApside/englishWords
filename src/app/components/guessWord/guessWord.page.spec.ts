import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { GuessWordPage } from './guessWord.page';

describe('GuessWordPage', () => {
  let component: GuessWordPage;
  let fixture: ComponentFixture<GuessWordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuessWordPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GuessWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
