import { useAppDispatch, useAppSelector } from "common/hooks";
import { Game } from "common/utils/classes/Game";
import { getMapData, getPlayerData, setCurrentRoom } from "./dungeonSlice";
import { useEffect, useRef, useState } from "react";
import { getIsActionRoom } from "common/utils";
import { useDungeonContext } from "common/context";

export const Map: React.FC = () => {
	const dispatch = useAppDispatch();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mapData = useAppSelector(getMapData);
	const playerData = useAppSelector(getPlayerData);
	const dungeonContext = useDungeonContext();
	const [game, setGame] = useState<Game | null>(null);

	useEffect(() => {
		if (game) {
			return;
		}
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (canvas && context && mapData && playerData) {
			setGame(new Game(mapData, playerData, canvas, context));
		}
	}, [mapData, playerData, game]);

	useEffect(() => {
		if (game) {
			game.run();
		}
	}, [game]);

	const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!game) {
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const room = game.move(x, y);
		if (!room) {
			return;
		}

		dispatch(setCurrentRoom(room));

		if (getIsActionRoom(room)) {
			dungeonContext.dispatch({
				type: "OPEN",
				payload: room.type,
			});
		}
	};

	return <canvas ref={canvasRef} onClick={handleMove} width={800} height={600} style={{ width: 800, height: 600 }} />;
};
