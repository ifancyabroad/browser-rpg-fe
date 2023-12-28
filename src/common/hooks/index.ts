import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "app/store";
import { getActualLevel, getCurrentLocation } from "features/dungeon";
import { ILocation } from "common/types";
import { RoomState } from "common/utils";
import { AStarFinder } from "astar-typescript";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFindPath = (destination: ILocation) => {
	const location = useAppSelector(getCurrentLocation);
	const level = useAppSelector(getActualLevel);

	if (!location) {
		return [];
	}

	const isActiveLevel = location.level === destination.level;
	if (!isActiveLevel) {
		return [];
	}

	const matrix = level.map((row, y) =>
		row.map(({ state }, x) => {
			if (y === destination.y && x === destination.x) {
				return 0;
			}
			return state === RoomState.Blocking ? 1 : 0;
		}),
	);
	const aStarInstance = new AStarFinder({
		grid: { matrix },
		diagonalAllowed: false,
	});
	const startPos = { x: location.x, y: location.y };
	const goalPos = { x: destination.x, y: destination.y };
	return aStarInstance.findPath(startPos, goalPos);
};
