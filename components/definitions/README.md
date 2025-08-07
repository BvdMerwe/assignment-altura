# Translation Management System

A Vue 3 + Nuxt application for managing translation keys with real-time search, filtering, and pagination capabilities.

## Features

- **Translation Management**: View translation keys with their associated values across multiple languages
- **Real-time Search**: Debounced search functionality for translation keys (minimum 3 characters)
- **Date Range Filtering**: Filter translations by update date using an intuitive date range picker
- **Pagination**: Configurable row limits with server-side pagination
- **Responsive Data Table**: Clean, sortable table interface with loading states

## Tech Stack

- **Framework**: Vue 3 + Nuxt 3
- **UI Components**: [shadcn/vue](https://www.shadcn-vue.com/) components for reusability and customizability (everything in `components/ui`)
- **Data Table**: TanStack Vue Table for advanced table functionality - with custom pagination to handle directus API calls
- **Date Handling**: @internationalized/date for robust date operations
- **Icons**: Lucide Vue Next for consistent iconography
- **Backend**: Directus CMS integration via proxy
- **Utilities**: VueUse for reactive utilities

## Supported Languages (as fetched from https://directus.altura.io/items/translationKeys_translations?fields[]=languages_code&groupBy[]=languages_code)

- 🇩🇰 Danish (da-DK)
- 🇩🇪 German (de-DE)
- 🇬🇧 English UK (en-GB)
- 🇫🇷 French (fr-FR)
- 🇳🇱 Dutch (nl-NL)

## API Integration

The application connects to Directus CMS through a **proxy configuration** in `nuxt.config.ts` to avoid CORS issues:

```ts
nitro: {
  routeRules: {
    "/api/**": {
      proxy: "https://directus.altura.io/**",
    },
  },
}
```

The application uses a custom `useApi` composable that provides:

- **Caching**: Automatic request caching with generated cache keys
- **Aggregation**: Count and other aggregate operations
- **Filtering**: Advanced filtering with date ranges and text search
- **Pagination**: Server-side pagination support

## Key Components

### Data Management
- `useApi` composable for Directus integration
- Debounced search and filtering (300ms delay)
- Reactive query building with filter management

### UI Components
- `DateRangePicker` - Custom date range selection with calendar
- `DataTable` - Advanced table with sorting and pagination
- `TranslationValuesComponent` - Display translation values with language flags

### Utilities
- Cache key generation for API requests
- Date formatting and distance calculations
- Language code to emoji mapping
- Class name utilities for conditional styling

## Usage

The main interface provides:
1. **Search bar** - Filter translation keys by text content
2. **Date range picker** - Filter by last update date
3. **Row limit selector** - Control pagination size
4. **Data table** - View translations with sortable columns

All filters work together and are applied with debouncing to optimize performance.

## Why pnpm?

This project uses **pnpm** instead of npm because:
- **Faster installs**: Up to 2x faster than npm
- **Disk efficiency**: Shared package store reduces disk usage
- **Stricter dependencies**: Better dependency resolution
- **Monorepo support**: Better handling of workspaces

## Development

The application follows Vue 3 composition API patterns with TypeScript for type safety. Components are designed to be reusable and prop-driven for maximum flexibility.

It is recommended to develop with your IDE running `eslint --fix` on save to clean up any unwanted code style issues. The full breakdown of rules can be seen in the `eslint.config.mjs`.