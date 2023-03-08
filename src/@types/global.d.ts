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

interface ClusterType extends PointType {
	count: number
}

interface PlaylistStatsType {
	slug: string;
	fileId: number;
	center: PointType;
	listeners: PointFeature<AnyProps>[];
	displayMode?: "playlist" | "drip"
}

interface ThemeContextType {
	isMobile: boolean;
}