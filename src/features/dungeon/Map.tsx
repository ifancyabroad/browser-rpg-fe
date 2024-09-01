import { useAppSelector } from "common/hooks";
import { Game } from "common/utils/classes/Game";
import { memo, useEffect, useRef, useState } from "react";
import { getIsActionTile } from "common/utils";
import { useDungeonContext } from "common/context";

interface IProps {
	height: number;
	width: number;
}

export const Map: React.FC<IProps> = memo(({ height, width }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const character = useAppSelector((state) => state.character.character);
	const characterClass = character?.characterClass.name;
	const dungeonContext = useDungeonContext();
	const [game, setGame] = useState<Game | null>(null);

	useEffect(() => {
		if (game) {
			return;
		}
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (canvas && context && characterClass) {
			setGame(new Game(characterClass, canvas, context));
		}
	}, [characterClass, game]);

	useEffect(() => {
		if (game) {
			game.run();
		}
	}, [game]);

	useEffect(() => {
		if (game && characterClass) {
			game.setData(characterClass);
		}
	}, [game, characterClass]);

	const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!game) {
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const tile = game.move(x, y);
		if (!tile) {
			return;
		}

		if (getIsActionTile(tile)) {
			dungeonContext.dispatch({
				type: "OPEN",
				payload: tile.type,
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
