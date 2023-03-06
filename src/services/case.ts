import _ from "lodash";

export const camelize = (obj: object) =>
	_.transform(obj, (acc: any, value: any, key: string, target: any) => {
		const camelKey = _.isArray(target) ? key : _.camelCase(key);

		acc[camelKey] = _.isObject(value) ? camelize(value) : value;
	});

export const snakeize = (obj: object) =>
	_.transform(obj, (acc: any, value: any, key: string, target: any) => {
		const snakeKey = _.isArray(target) ? key : _.snakeCase(key);

		acc[snakeKey] = _.isObject(value) ? snakeize(value) : value;
	});
