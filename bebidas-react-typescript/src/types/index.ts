import { z } from 'zod';
import { CategoriesAPIResponseSchema, SearchFiltersSchema } from '../utils/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilters = z.infer<typeof SearchFiltersSchema>;
