import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: App Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            providers   : [],
            imports     : [IonicModule.forRoot(MyApp)]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it("is created", () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it("initializes with HomePage as the root page", () => {
        expect(comp["rootPage"]).toBe(HomePage);
    });
});