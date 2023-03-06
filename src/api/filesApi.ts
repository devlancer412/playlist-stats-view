import axios from "axios";
import { defaultPosition, markersData } from "@data/sampleData";
import { sleep } from "@services/misc";

export const filesApi = axios.create({
	baseURL: process.env.REACT_APP_FILES_API,
});

const mockedViewPlaylistStats = async (
	slug: string,
	fileId: number,
) =>
	new Promise(async (resolve, reject) => {
		// wait 1 second to simulate network latency
		await sleep(1000);

		resolve({
			data: {
				slug,
				fileId,
				center: defaultPosition,
				listeners: markersData,
				displayMode: "playlist"
			},
		});
	}).then((res: any) => res.data as PlaylistStatsType);

const mockedViewDripStats = async (
	slug: string,
	fileId: number,
) =>
	new Promise(async (resolve, reject) => {
		// wait 1 second to simulate network latency
		await sleep(1000);

		resolve({
			data: {
				slug,
				fileId,
				center: defaultPosition,
				listeners: markersData,
				displayMode: "playlist"
			},
		});
	}).then((res: any) => res.data as PlaylistStatsType);

export const MockedFilesApiService = {
	viewPlaylistStats: mockedViewPlaylistStats,
	viewDripStats: mockedViewDripStats,
};
