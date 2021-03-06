import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

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

  constructor() {}

  ngOnInit() {
  }

  public updateFilter(filterName: string, index: number): void {
    this.filter[this.FILTER_ALL] = false;
    this.filter[filterName].options[index].value = !this.filter[filterName].options[index].value;
  }

  public updateMoreButton() {
    console.log('asdadasd');
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
    this.resetMainFilter();
    this.resetMoreFilter();
  }

  private resetMainFilter() {
    this.filter.mainFilter.options.map(item => item.value = false);
  }

  private resetMoreFilter() {
    this.filter.moreFilter.options.map(item => item.value = false);
  }
}
