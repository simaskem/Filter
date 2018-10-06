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
    small: false,
    medium: false,
    large: false,
    suv: false,
    van: false,
    more: {
      value: false,
      options: [
        {label: 'Pickup Truck', value: false},
        {label: 'Luxury', value: false},
        {label: 'Convertible', value: false},
        {label: 'Commercial', value: false},
      ],
    },
  };

  constructor(private renderer: Renderer2) {}

  public updateFilter(index: string|number, isMoreOptionClicked = false) {
    this.filter['all'] = false;

    if (isMoreOptionClicked) {
      this.filter.more.options[index].value = !this.filter.more.options[index].value;
      return;
    }

    if (index === 'more') {
      this.filter.more.value = !this.filter.more.value;
      return;
    }

    this.filter[index] = !this.filter[index];
  }

  public updateAll() {
    this.resetFilter();
    this.filter['all'] = true;
    this.isFilterFalsy();
  }

  private resetFilter() {
    Object.keys(this.filter).map(key => {
      if (key === 'more') {
        return this.filter[key].options.map(item => item.value = false);
      }
      return this.filter[key] = false;
    });
  }

  private isFilterFalsy() {
    this.filter.filter((item, key) => key !== 'more');
    console.log(this.filter);
  }

  @HostListener('document:click', ['$event'])
  public clickOut(event: MouseEvent) {
    if (
      !this.dropdown.nativeElement.contains(event.target) &&
      !this.dropdownButton.nativeElement.contains(event.target)
    ) {
      this.renderer.removeClass(this.dropdown.nativeElement, 'open');
      this.filter.more.value = false;
    }
  }
}


