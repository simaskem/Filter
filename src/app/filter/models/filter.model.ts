export interface MoreFilter {
  value: boolean;
  options: MoreOption[];
}

export interface MoreOption {
  label: string;
  value: boolean;
  price: string;
}

export interface UpdateFilterPayload {
  filterName: string;
  index: number;
}
