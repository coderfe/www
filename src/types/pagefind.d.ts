declare interface PagefindResult {
  url: string;
  content: string;
  word_count: number;
  filters: Filters;
  meta: Meta;
  anchors: Anchor[];
  weighted_locations: WeightedLocation[];
  locations: number[];
  raw_content: string;
  raw_url: string;
  excerpt: string;
  sub_results: SubResult[];
}

declare interface Filters {}

declare interface Meta {
  title: string;
  image: string;
  image_alt: string;
}

declare interface Anchor {
  element: string;
  id: string;
  text: string;
  location: number;
}

declare interface WeightedLocation {
  weight: number;
  balanced_score: number;
  location: number;
}

declare interface SubResult {
  title: string;
  url: string;
  anchor: Anchor2;
  weighted_locations: WeightedLocation2[];
  locations: number[];
  excerpt: string;
}

declare interface Anchor2 {
  element: string;
  id: string;
  text: string;
  location: number;
}

declare interface WeightedLocation2 {
  weight: number;
  balanced_score: number;
  location: number;
}
