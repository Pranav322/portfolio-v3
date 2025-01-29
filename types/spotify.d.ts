export interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  url: string;
  playedAt?: string;
  previewUrl?: string;
  timeAgo?: string;
  albumImageUrl?: string;
}

export interface AudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  acousticness: number;
}
