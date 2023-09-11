import React from "react";
import LinearProgress, { LinearProgressProps, linearProgressClasses } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { darken } from "@mui/material";

interface IProps extends LinearProgressProps {
	value: number;
	label: string;
	min?: number;
	max?: number;
	customColor?: string;
}

export const LinearProgressWithLabel: React.FC<IProps> = ({
	value,
	label,
	min = 0,
	max = 100,
	customColor,
	...props
}) => {
	const normalisedValue = ((value - min) * 100) / (max - min);

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress
					variant="determinate"
					value={normalisedValue}
					sx={{
						[`&.${linearProgressClasses.colorPrimary}`]: {
							backgroundColor: customColor && darken(customColor, 0.5),
						},
						[`& .${linearProgressClasses.bar}`]: {
							backgroundColor: customColor,
						},
					}}
					{...props}
				/>
			</Box>
			<Box sx={{ minWidth: 45 }}>
				<Typography variant="body2" color="text.secondary">
					{label}
				</Typography>
			</Box>
		</Box>
	);
};
