import axios from 'axios';
import { SuggestionDto, SuggestionPayload, Suggestion } from '../types/suggestion.types';

const DEFAULT_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getSuggestions = async (suggestion: SuggestionDto): Promise<string[]> => {
  const url = DEFAULT_URL + suggestion.type;
  const count = suggestion.count ?? 10;

  let payload: SuggestionPayload = {
    query: suggestion.query,
    count,
  };

  const config = {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Token ${suggestion.token}`,
    },
  };

  const {
    data: { suggestions },
  } = await axios.post(url, payload, config);

  return suggestions.map((s: Suggestion) => s.value);
};
