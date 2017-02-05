import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';
import { DebugElement }                     from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';

import { MyApp } from '../../app/app.component';

import { HomePage } from './home';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let debugElement: DebugElement;
let element: HTMLElement;

describe('Page: Home Page', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, HomePage],
            providers: [NavController
            ],
            imports: [
                IonicModule.forRoot(MyApp)
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        comp    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
        debugElement= null;
        element = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it('initializes with a title of "Pizza Service by Team Thanos (Übungsblatt D)"', () => {
        debugElement= fixture.debugElement.query(By.css('ion-title'));
        element = debugElement.nativeElement;
        expect(element.textContent).toEqual("Pizza Service by Team Thanos (Übungsblatt D)");
    });
});