import { Stack, Typography } from "@mui/material";
import { TProperty } from "common/types";
import { getPropertyText } from "common/utils";

interface IProps {
	properties: TProperty[];
}

export const PropertyList: React.FC<IProps> = ({ properties }) => {
	return (
		<Stack>
			{properties.map((property, index) => (
				<Typography key={index} variant="body2">
					{getPropertyText(property)}
				</Typography>
			))}
		</Stack>
	);
};
