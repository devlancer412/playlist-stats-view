declare module "react-rating-stars-component";

interface PlaylistStatsContextType {
	playlistStats: PlaylistStatsType | null;
	fetchPlaylistStats: (slug: string, fileId: number) => Promise<void>;
	isDrip: boolean;
	isLoading: boolean;
	error: boolean;
}

interface PointType {
	lat: number
	lng: number
}

interface PlaylistStatsType {
	slug: string;
	fileId: number;
	center: PointType;
	listeners: PointType[];
	displayMode?: "playlist" | "drip"
}

interface ThemeContextType {
	isMobile: boolean;
}