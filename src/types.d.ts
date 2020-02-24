// Interfaces -------------------------------------------
declare interface AppWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare interface ReducerState {
  [key: string]: any;
}

declare interface CombinedState {
  user: ReducerState;
  customer: ReducerState;
  search: ReducerState;
  newCompany: ReducerState;
}

declare interface Action {
  type: string;
  payload?: any;
  error?: any;
}

declare interface ActionHandler {
  [key: string]: (state: ReducerState, action: Action) => Store;
}

declare interface UserName {
  forename: string;
  middleName?: string;
  surname: string;
}

declare interface User {
  profilePhoto?: string;
  name: UserName;
  username: string;
}

declare interface Quote {
  id: string;
  type: string;
  startDate: string;
  insurer: string;
  rate: number;
  decline?: string;
  salesExecutive?: User;
}

declare interface SearchHit {
  id: string;
  fields: { [key: string]: string };
}

declare interface SearchHitList {
  found: number;
  start: number;
  hit: SearchHit[];
}

declare interface SearchSuggestion {
  id: string;
  score: number;
  suggestion: string;
}

declare interface SearchSuggestionList {
  query: string;
  found: number;
  suggestions: SearchSuggestion[];
}

declare type SearchResult = SearchHit | SearchSuggestion;

declare type SearchResults = SearchHitList | SearchSuggestionList;

declare interface SearchState {
  customerSearchResults: SearchHitList;
  abiSearchResults: SearchHitList;
}

declare interface SearchSuggestResponse {
  suggest: SearchSuggestionList;
}

declare interface SearchHitListResponse {
  hits: SearchHitList;
}

declare type SearchResponse = SearchSuggestResponse | SearchHitListResponse;

declare interface SearchOptions {
  suggester?: string;
  options?: string[];
}

declare interface CustomerSearchResult {
  id: string;
  type: string;
  forename?: string;
  surname?: string;
  date_of_birth?: string;
  postcode?: string;
  company_name?: string;
  trading_name?: string;
  registered_co_number?: string;
}

declare interface Policy {
  id: string;
  type: string;
  insurer: string;
  startDate: string;
  endDate: string;
  rate?: number;
}

declare interface DateFieldValues {
  dd: string;
  mm: string;
  yyyy: string;
}

declare interface NewCompanyData {
  companyName: string;
  contactDetails: Contact[];
  subsidiaries?: Company[];
  addresses: Address[];
  typeStatus?: CompanyTypeStatus;
  tradingName?: string;
  tradingSinceDate: DateFieldValues;
  businessClass: string;
  parentCompany?: boolean;
  parentCompanyName?: string;
  registeredCoNumber: string;
  additionalContacts?: AdditionalContact[];
  contactPreferences?: ContactPreferences;
}

declare interface FormProps {
  additionalClasses?: string[];
  initialValues?: unknown;
  submissionAttempted?: boolean;
  config?: unknown;
  onChange(state: unknown, isFormValid: boolean): void;
  onSubmit?(): void;
}

declare interface ItemTableProps {
  items: unknown[];
  onEdit?(rowIndex: number): void;
  onDelete?(rowIndex: number): void;
}

// Types ------------------------------------------

type FieldValue = string | boolean | unknown[] | DateFieldValues | undefined;

// Enums -------------------------------------------

declare const enum Status {
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning',
  Danger = 'Danger',
  Secondary = 'Secondary'
}

declare const enum InputType {
  Text = 'Text',
  Lookup = 'Lookup',
  AbiSearch = 'AbiSearch',
  Dropdown = 'Dropdown',
  DateFields = 'DateFields',
  MultiChoice = 'MultiChoice'
}
