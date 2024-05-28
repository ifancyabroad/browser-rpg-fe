import { styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { TILE_SIZE } from "common/utils";
import { useEffect, useReducer } from "react";
import { Player } from "./Player";
import { Tile } from "./Tile";
import { getActualLevel, getGridOffset, setPath } from "./dungeonSlice";
import { DungeonContext, dungeonReducer, initialState } from "common/context";
import { RoomModals } from "./RoomModals";
import { RoomWindow } from "./RoomWindow";

const Canvas = styled("div")({
	position: "relative",
	flex: 1,
	display: "flex",
	flexDirection: "column",
	width: "100%",
	height: "100%",
	overflow: "hidden",
});

interface IGridProps {
	columns: number;
	top: number;
	left: number;
}

const GridWrapper = styled("div")({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});

const Grid = styled("div", {
	shouldForwardProp: (prop) => prop !== "columns",
})<IGridProps>(({ columns, top, left }) => ({
	position: "relative",
	top: `${top}px`,
	left: `${left}px`,
	display: "grid",
	gridTemplateColumns: `repeat(${columns}, ${TILE_SIZE}px)`,
	gap: "1px",
}));

export const Dungeon: React.FC = () => {
	const dispatch = useAppDispatch();
	const level = useAppSelector(getActualLevel);
	const character = useAppSelector((state) => state.character.character);
	const gridOffset = useAppSelector(getGridOffset);
	const [state, localDispatch] = useReducer(dungeonReducer, initialState);
	const providerState = { state, dispatch: localDispatch };

	useEffect(() => {
		return () => {
			dispatch(setPath([]));
		};
	}, [dispatch]);

	if (!character) {
		return null;
	}

	return (
		<DungeonContext.Provider value={providerState}>
			<Canvas>
				<RoomWindow />
				{gridOffset && (
					<GridWrapper>
						<Grid columns={level.length} top={gridOffset.top} left={gridOffset.left}>
							{level.map((row, y) =>
								row.map((room, x) => {
									const level = character.map.location.level;
									const id = `${level}${y}${x}`;
									return <Tile key={id} room={room} />;
								}),
							)}
						</Grid>
					</GridWrapper>
				)}
				<Player image={character.characterClass.icon} />
			</Canvas>

			<RoomModals />
		</DungeonContext.Provider>
	);
};
