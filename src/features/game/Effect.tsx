import { Tooltip } from "@mui/material";
import { IStatus } from "common/types";
import { Box, Typography } from "@mui/material";
import { getPropertyConfig } from "common/utils";
import { SkillIcon } from "common/components";

export const StatusDetails: React.FC<IStatus> = (effect) => (
	<Box>
		<Typography sx={{ fontWeight: "medium" }}>{effect.skill.name}</Typography>
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Remaining:{" "}
				</Box>
				{effect.remaining} turns
			</Typography>
			{"properties" in effect && (
				<Typography component="li" variant="body2">
					<Box component="span" sx={{ fontWeight: "medium" }}>
						Properties
					</Box>
					<Box component="ul">
						{effect.properties?.map((stat) => (
							<Typography key={stat.name} component="li" variant="body2">
								<Box component="span" sx={{ fontWeight: "medium" }}>
									{getPropertyConfig(stat)?.name}:{" "}
								</Box>
								{stat.value}
							</Typography>
						))}
					</Box>
				</Typography>
			)}
		</Box>
	</Box>
);

export const StatusEffect: React.FC<IStatus> = (status) => {
	const icon = status.skill.icon || "https://via.placeholder.com/40";

	return (
		<Tooltip title={<StatusDetails {...status} />} placement="top">
			<img src={icon} alt={SkillIcon.name} />
		</Tooltip>
	);
};
