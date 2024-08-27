import { useAppDispatch, useAppSelector } from "common/hooks";
import { Game } from "common/utils/classes/Game";
import { memo, useEffect, useRef, useState } from "react";
import { getIsActionRoom } from "common/utils";
import { useDungeonContext } from "common/context";

interface IProps {
	height: number;
	width: number;
}

export const Map: React.FC<IProps> = memo(({ height, width }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const character = useAppSelector((state) => state.character.character);
	const zone = character?.zone;
	const dungeonContext = useDungeonContext();
	const [game, setGame] = useState<Game | null>(null);

	useEffect(() => {
		if (game) {
			return;
		}
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (canvas && context && zone) {
			setGame(new Game(zone, canvas, context));
		}
	}, [zone, game]);

	useEffect(() => {
		if (game) {
			game.run();
		}
	}, [game]);

	useEffect(() => {
		if (game && zone) {
			game.setData(zone);
		}
	}, [game, zone]);

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

		if (getIsActionRoom(room)) {
			dungeonContext.dispatch({
				type: "OPEN",
				payload: room.type,
			});
		}
	};

	const handleHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!game) {
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		game.hover(x, y);
	};

	return (
		<canvas
			ref={canvasRef}
			onClick={handleMove}
			onMouseMove={handleHover}
			width={width}
			height={height}
			style={{ width, height }}
		/>
	);
});
