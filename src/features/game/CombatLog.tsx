import { Box, Paper, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { IAction } from "common/types";
import { Target } from "common/utils";
import { Fragment } from "react";

const Action: React.FC<IAction> = ({ damage, enemy, heal, self, skill, weaponDamage }) => {
	const getTarget = (target: Target) => {
		return target === Target.Enemy ? enemy : self;
	};

	return (
		<Fragment>
			<Typography variant="body2">
				{self} uses {skill}
			</Typography>
			{weaponDamage
				.flatMap((damage) => damage)
				.map((damage, index) => (
					<Typography key={index} variant="body2">
						{getTarget(damage.target)} takes {damage.value} damage ({damage.type}) ({damage.hitType})
					</Typography>
				))}
			{damage.map((damage, index) => (
				<Typography key={index} variant="body2">
					{getTarget(damage.target)} takes {damage.value} damage ({damage.type})
				</Typography>
			))}
			{heal.map((heal, index) => (
				<Typography key={index} variant="body2">
					{getTarget(heal.target)} restores {heal.value} hit points
				</Typography>
			))}
		</Fragment>
	);
};

interface IProps {
	turns: IAction[][];
}

export const CombatLog: React.FC<IProps> = ({ turns }) => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.game.battle);

	if (!character || !battle) {
		return null;
	}

	const reversedTurns = [...turns].reverse();

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h6">Combat Log</Typography>
			<Paper
				variant="outlined"
				sx={{
					flex: 1,
					p: 2,
					display: "flex",
					flexDirection: "column",
					maxHeight: "400px",
					minHeight: "400px",
				}}
			>
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column-reverse", overflowY: "scroll" }}>
					{reversedTurns.map((turn, index) => (
						<div key={index}>
							<Typography variant="body2">Turn {reversedTurns.length - index}</Typography>
							{turn.map((action, index2) => (
								<Action key={`action-${index}-${index2}`} {...action} />
							))}
						</div>
					))}
				</Box>
			</Paper>
		</Box>
	);
};
