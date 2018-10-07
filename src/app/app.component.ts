import {Component, ElementRef, ViewChild, HostListener, Renderer2} from '@angular/core';

export interface MoreFilter {
  'Pickup Truck': boolean;
  Luxury: boolean;
  Convertible: boolean;
  Commercial: boolean;
}

export interface Filter {
  all: boolean;
  small: boolean;
  medium: boolean;
  large: boolean;
  suv: boolean;
  van: boolean;
  more: MoreFilter;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @ViewChild('dropdown') private dropdown: ElementRef;
  @ViewChild('dropdownButton') private dropdownButton: ElementRef;

  public filter = {
    all: false,
    mainFilter: {
      options: [
        {label: 'Small', value: false, price: '234'},
        {label: 'Medium', value: false, price: '155'},
        {label: 'Large', value: false, price: '644'},
        {label: 'SUV', value: false, price: '173'},
        {label: 'Van', value: false, price: '425'},
      ]
    },
    moreFilter: {
      value: false,
      options: [
        {label: 'Pickup Truck', value: false, price: '336'},
        {label: 'Luxury', value: false, price: '476'},
        {label: 'Convertible', value: false, price: '581'},
        {label: 'Commercial', value: false, price: '660'},
      ],
    },
  };

  private FILTER_ALL = 'all';

  constructor(private renderer: Renderer2) {}

  public updateFilter(filterName: string, index: number): void {
    this.filter[this.FILTER_ALL] = false;
    this.filter[filterName].options[index].value = !this.filter[filterName].options[index].value;
  }

  public updateMoreButton() {
    this.filter[this.FILTER_ALL] = false;
    this.filter.moreFilter.value = !this.filter.moreFilter.value;
  }

  public updateAll(): void {
    this.resetFilter();
    this.filter[this.FILTER_ALL] = true;
  }

  public get isFilterFalsy(): boolean {
    return this.isMainFilterFalsy && this.isMoreFilterFalsy;
  }

  public get isMainFilterFalsy(): boolean {
    return this.filter.mainFilter.options.every(item => !item.value);
  }

  public get isMoreFilterFalsy(): boolean {
    return this.filter.moreFilter.options.every(item => !item.value);
  }

  private resetFilter(): void {
    this.filter.mainFilter.options.map(item => item.value = false);
    this.filter.moreFilter.options.map(item => item.value = false);
  }


  @HostListener('document:click', ['$event'])
  public clickOut(event: MouseEvent) {
    if (
      !this.dropdown.nativeElement.contains(event.target) &&
      !this.dropdownButton.nativeElement.contains(event.target)
    ) {
      this.renderer.removeClass(this.dropdown.nativeElement, 'open');
      this.filter.moreFilter.value = false;
    }
  }
}


