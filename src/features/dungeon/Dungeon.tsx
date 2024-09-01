import { styled, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { useCallback, useReducer, useState } from "react";
import { DungeonContext, dungeonReducer, initialState } from "common/context";
import { RoomModals } from "./ZoneModals";
import { CharacterButton, Loader } from "common/components";
import { Map } from "./Map";
import { State } from "common/utils";

const Wrapper = styled("div")({
	position: "relative",
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "100%",
	overflow: "hidden",
});

const Overlay = styled("div")({
	position: "absolute",
	height: "100%",
	width: "100%",
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	zIndex: 100,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

export const Dungeon: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const [state, localDispatch] = useReducer(dungeonReducer, initialState);
	const providerState = { state, dispatch: localDispatch };
	const [elementRect, setElementRect] = useState<DOMRect | null>(null);

	const handleRect = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			setElementRect(node.getBoundingClientRect());
		}
	}, []);

	if (!character) {
		return null;
	}

	const isBattle = character.state === State.Battle;

	return (
		<DungeonContext.Provider value={providerState}>
			<Wrapper ref={handleRect}>
				<CharacterButton />

				{elementRect ? <Map height={elementRect.height} width={elementRect.width} /> : <Loader />}

				{isBattle && (
					<Overlay>
						<Typography color="text.secondary">Adventuring...</Typography>
					</Overlay>
				)}
			</Wrapper>

			<RoomModals />
		</DungeonContext.Provider>
	);
};
