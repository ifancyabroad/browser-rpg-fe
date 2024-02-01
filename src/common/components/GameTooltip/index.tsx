import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { ImageBorder } from "../ImageBorder";

export const GameTooltip: React.FC<PropsWithChildren> = ({ children }) => (
	<ImageBorder>
		<Box p={2}>{children}</Box>
	</ImageBorder>
);
