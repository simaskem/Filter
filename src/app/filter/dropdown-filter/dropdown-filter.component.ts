import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {MoreFilter, UpdateFilterPayload} from '../models/filter.model';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {

  @ViewChild('dropdown') private dropdown: ElementRef;
  @ViewChild('dropdownButton') private dropdownButton: ElementRef;

  @Input() filter: MoreFilter;
  @Input() isMoreFilterFalsy: boolean;
  @Output() updateMoreButtonEvent: EventEmitter<any> = new EventEmitter();
  @Output() resetMoreFilterEvent: EventEmitter<any> = new EventEmitter();
  @Output() updateFilterEvent: EventEmitter<UpdateFilterPayload> = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  public updateMoreButton() {
    this.updateMoreButtonEvent.emit();
  }

  public resetMoreFilter() {
    this.resetMoreFilterEvent.emit();
  }

  public updateFilter(filterName: string, index: number) {
    this.updateFilterEvent.emit({filterName, index});
  }

  @HostListener('document:click', ['$event'])
  public clickOut(event: MouseEvent) {
    if (
      !this.dropdown.nativeElement.contains(event.target) &&
      !this.dropdownButton.nativeElement.contains(event.target)
    ) {
      this.renderer.removeClass(this.dropdown.nativeElement, 'open');
      this.filter.value = false;
    }
  }
}
