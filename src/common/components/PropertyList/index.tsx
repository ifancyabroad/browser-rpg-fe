import { Stack, Typography } from "@mui/material";
import { TProperty } from "common/types";
import { PROPERTY_CONFIG, getPropertyConfig } from "common/utils";

interface IProps {
	properties: TProperty[];
}

export const PropertyList: React.FC<IProps> = ({ properties }) => {
	return (
		<Stack spacing={1}>
			{properties.map((property) => {
				const config = getPropertyConfig(property);
				const { prefix, suffix } = PROPERTY_CONFIG[property.type];

				if (!config) {
					return null;
				}

				const { key, name } = config;

				return (
					<Typography key={key} variant="body2">
						{property.value >= 0 && prefix}
						{property.value}
						{suffix} {name}
					</Typography>
				);
			})}
		</Stack>
	);
};
