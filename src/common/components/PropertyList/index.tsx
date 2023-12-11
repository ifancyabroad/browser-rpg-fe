import { Typography } from "@mui/material";
import { TProperty } from "common/types";
import { getPropertyText } from "common/utils";
import { Fragment } from "react";

interface IProps {
	properties: TProperty[];
}

export const PropertyList: React.FC<IProps> = ({ properties }) => {
	return (
		<Fragment>
			{properties.map((property, index) => (
				<Typography key={index} variant="body2">
					{getPropertyText(property)}
				</Typography>
			))}
		</Fragment>
	);
};
