export const formatFileTime = (millis: number) =>
	formatTime(millis, { isMilli: true });

/**
 *
 * @param time - time in seconds
 * @param isMilli - if true, time is in milliseconds
 * @returns
 */
export const formatTime = (time: number = 0, config = { isMilli: false }) => {
	const seconds = config?.isMilli ? time / 1000 : time;

	var hh = Math.floor(seconds / 3600),
		mm = Math.floor(seconds / 60) % 60,
		ss = Math.floor(seconds) % 60;
	return (
		(hh ? (hh < 10 ? "0" : "") + hh + ":" : "") +
		(mm < 10 ? "0" : "") +
		mm +
		":" +
		(ss < 10 ? "0" : "") +
		ss
	);
};
