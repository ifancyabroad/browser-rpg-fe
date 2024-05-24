import { Box, Typography, styled } from "@mui/material";

const BarWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	width: "256px",
	height: "24px",
	backgroundColor: theme.palette.grey[900],
}));

const Bar = styled(Box)(({ theme }) => ({
	position: "relative",
	height: "100%",
	backgroundColor: theme.palette.success.main,
	transition: "width 0.5s ease-in-out",
}));

interface IProps {
	value: number;
	max: number;
}

export const HealthBar: React.FC<IProps> = ({ value, max }) => {
	const normalisedValue = value < 0 ? 0 : value > max ? 100 : ((value - 0) * 100) / (max - 0);

	return (
		<Box display="flex" gap={2} alignItems="center">
			<BarWrapper>
				<Bar sx={{ width: `${normalisedValue}%` }} />
			</BarWrapper>

			<Typography width="40%">
				<Box component="span" color="secondary.main">
					HP
				</Box>{" "}
				{value}/{max}
			</Typography>
		</Box>
	);
};
