import { Button, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { RoomType, TILE_SIZE } from "common/utils";
import { nextLevel, rest } from "features/character";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { ConfirmationModal, openErrorModal, openShopModal, openTreasureModal } from "features/modals";
import { Player } from "./Player";
import { Tile } from "./Tile";
import { startBattle } from "features/battle";
import {
	getActualLevel,
	getCurrentLocation,
	getCurrentRoom,
	getGridOffset,
	getIsActiveRoom,
	setPath,
} from "./dungeonSlice";

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

const defaultModalState = {
	[RoomType.Battle]: false,
	[RoomType.Boss]: false,
	[RoomType.Shop]: false,
	[RoomType.Treasure]: false,
	[RoomType.Rest]: false,
	[RoomType.Exit]: false,
};

export const Dungeon: React.FC = () => {
	const dispatch = useAppDispatch();
	const level = useAppSelector(getActualLevel);
	const character = useAppSelector((state) => state.character.character);
	const room = useAppSelector(getCurrentRoom);
	const roomType = room ? room.type : RoomType.Empty;
	const location = useAppSelector(getCurrentLocation);
	const gridOffset = useAppSelector(getGridOffset);
	const [modalState, setModalState] = useState(defaultModalState);
	const battleStatus = useAppSelector((state) => state.battle.status);
	const isBattleLoading = battleStatus === "loading";
	const characterStatus = useAppSelector((state) => state.character.status);
	const isCharacterLoading = characterStatus === "loading";
	const isActionRoom = useAppSelector(getIsActiveRoom);

	const roomText = useMemo(() => {
		switch (roomType) {
			case RoomType.Battle:
				return "Start Battle";
			case RoomType.Boss:
				return "Fight Boss";
			case RoomType.Shop:
				return "Visit Merchant";
			case RoomType.Treasure:
				return "Open Chest";
			case RoomType.Rest:
				return "Rest";
			case RoomType.Exit:
				return "Descend";
			default:
				return "";
		}
	}, [roomType]);

	const handleLocation = useCallback(() => {
		dispatch(setPath([]));

		if (isActionRoom) {
			setModalState((state) => ({ ...state, [roomType]: true }));
		}
	}, [dispatch, isActionRoom, roomType]);

	useEffect(() => {
		handleLocation();
	}, [handleLocation]);

	useEffect(() => {
		return () => {
			dispatch(setPath([]));
		};
	}, [dispatch]);

	if (!character || !location) {
		return null;
	}

	const handleRest = async () => {
		try {
			await dispatch(rest(location)).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Rest]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleStartBattle = async () => {
		try {
			await dispatch(startBattle(location)).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Battle]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleOpenShop = () => {
		dispatch(openShopModal());
		setModalState((state) => ({ ...state, [RoomType.Shop]: false }));
	};

	const handleOpenChest = async () => {
		dispatch(openTreasureModal());
		setModalState((state) => ({ ...state, [RoomType.Treasure]: false }));
	};

	const handleExit = async () => {
		try {
			await dispatch(nextLevel(location)).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Exit]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const closeConfirmationModal = () => {
		setModalState(defaultModalState);
	};

	return (
		<Fragment>
			<Canvas>
				<Button
					aria-label="character"
					onClick={handleLocation}
					sx={{
						display: isActionRoom ? null : "none",
						position: "absolute",
						top: 16,
						right: 24,
						zIndex: 1,
					}}
				>
					{roomText}
				</Button>
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

			<ConfirmationModal
				title="Rest?"
				content="You stumble upon an abandoned camp and a chance to rest for the night."
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={modalState[RoomType.Rest]}
				disabled={isCharacterLoading}
			/>
			<ConfirmationModal
				title="Start Battle"
				content="You have been ambushed by an enemy and must defend yourself!"
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={modalState[RoomType.Battle]}
				disabled={isBattleLoading}
			/>
			<ConfirmationModal
				title="Fight Boss"
				content="As you make your way to the exit you are stopped in your tracks by a powerful foe."
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={modalState[RoomType.Boss]}
				disabled={isBattleLoading}
			/>
			<ConfirmationModal
				title="Visit Merchant?"
				content="You come across a merchant interested in selling some items he has discovered."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={modalState[RoomType.Shop]}
			/>
			<ConfirmationModal
				title="Open Chest?"
				content="You find a treasure chest waiting to be opened."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenChest}
				open={modalState[RoomType.Treasure]}
			/>
			<ConfirmationModal
				title="Descend"
				content="You have found a staircase descending further into the dungeon, are you ready to proceed?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleExit}
				open={modalState[RoomType.Exit]}
				disabled={isCharacterLoading}
			/>
		</Fragment>
	);
};
