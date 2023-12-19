import React from "react";
import LinearProgress, { LinearProgressProps, linearProgressClasses } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, Tooltip, darken, styled } from "@mui/material";

interface IProgressProps {
	customColor?: string;
}

const StyledLinearProgress = styled(LinearProgress, {
	shouldForwardProp: (prop) => prop !== "customColor",
})<IProgressProps>(({ theme, customColor }) => ({
	height: 20,
	boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.8), 0px 0px 0px 1px rgba(255,255,255,0.06)",
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: customColor && darken(customColor, 0.5),
	},
	[`& .${linearProgressClasses.bar}`]: {
		backgroundColor: customColor,
	},
}));

interface IProps extends LinearProgressProps {
	value: number;
	label: string;
	min?: number;
	max?: number;
	customColor?: string;
}

export const LinearProgressWithLabel: React.FC<IProps> = ({ value, title, label, min = 0, max = 100, ...props }) => {
	const normalisedValue = value > max ? 100 : ((value - min) * 100) / (max - min);

	return (
		<Tooltip title={title} placement="top" arrow>
			<Paper sx={{ position: "relative", border: "2px solid", borderColor: "background.paper" }}>
				<Box sx={{ width: "100%" }}>
					<StyledLinearProgress variant="determinate" value={normalisedValue} {...props} />
				</Box>
				<Typography
					variant="body2"
					color="text.secondary"
					fontSize={12}
					sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
				>
					{label}
				</Typography>
			</Paper>
		</Tooltip>
	);
};
