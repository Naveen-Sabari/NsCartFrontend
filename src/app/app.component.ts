import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CloudinaryModule } from '@cloudinary/ng';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PLATFORM_ID } from '@angular/core'; // Updated import
import { isPlatformBrowser}from  '@angular/common'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, RouterModule, CloudinaryModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  searchText: string = '';
  cartCount = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private apiService: ApiService, 
    private cartservice: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.cartservice.CurrentItem.pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.cartCount = data.length;
    });

   
    if (isPlatformBrowser(this.platformId)) {
  

    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search(): void {
    this.apiService.searchProducts(this.searchText);
  }
  clearSearch(): void {
    this.apiService.clearSearch(this.searchText);
  }
  searchByEnterKey(): void {
    this.search();
  }
}
