export type SuggestionType = 'address' | 'party'

export interface SuggestionDto {
  token: string;
  query: string;
  type?: SuggestionType;
  count?: number;
}

export interface SuggestionPayload {
  query: string;
  count?: number;
}

export interface Suggestion {
  value: string;
  unrestricted_value: string;
  data: any;
}


