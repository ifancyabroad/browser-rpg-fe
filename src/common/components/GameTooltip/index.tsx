import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";

export const GameTooltip: React.FC<PropsWithChildren> = ({ children }) => <Box p={2}>{children}</Box>;
