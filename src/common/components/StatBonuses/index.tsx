import { Stack, Typography } from "@mui/material";
import { getValueColor } from "common/utils";

interface IBonus {
	name: string;
	value: number;
}

interface IProps {
	baseValue: number;
	bonuses: IBonus[];
}

export const StatBonuses: React.FC<IProps> = ({ baseValue, bonuses }) => (
	<Stack>
		<Typography variant="body2" color="text.secondary">
			Base: {baseValue}
		</Typography>
		{bonuses.map(({ name, value }) => (
			<Typography key={name} color={getValueColor(value)} variant="body2">
				{value > 0 ? `+${value}` : value} {name}
			</Typography>
		))}
	</Stack>
);
