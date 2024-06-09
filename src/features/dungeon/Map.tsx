import { useAppSelector } from "common/hooks";
import { Game } from "common/utils/classes/Game";
import { getMapData } from "./dungeonSlice";
import { useCallback, useEffect, useRef } from "react";

export const Map: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mapData = useAppSelector(getMapData);

	const draw = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			const game = new Game(mapData, ctx);
			game.run();
		},
		[mapData],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (context) {
			draw(context);
		}
	}, [draw]);

	return <canvas ref={canvasRef} width={800} height={600} style={{ width: 800, height: 600 }} />;
};
