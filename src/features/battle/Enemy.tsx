import { Box } from "@mui/material";
import { ImageBorder, Portrait } from "common/components";
import { useAppSelector } from "common/hooks";
import skullIcon from "assets/images/ui/SkullIcon.png";

export const Enemy: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.battle?.enemy);

	if (!enemy) {
		return null;
	}

	const { name, image, hitPoints, maxHitPoints, activeAuxiliaryEffects, activeStatusEffects } = enemy;

	return (
		<Box maxWidth={600}>
			<Box mb={2}>
				<Portrait
					label={name}
					portrait={skullIcon}
					value={hitPoints}
					max={maxHitPoints}
					auxiliaryEffects={activeAuxiliaryEffects}
					statusEffects={activeStatusEffects}
				/>
			</Box>

			<Box
				sx={{
					width: "100%",
					aspectRatio: "1/1",
				}}
			>
				<ImageBorder>
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src={image}
						alt={name}
					/>
				</ImageBorder>
			</Box>
		</Box>
	);
};
