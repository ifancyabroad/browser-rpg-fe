import { Box, styled } from "@mui/material";
import { PropsWithChildren } from "react";

const OuterBevel = styled(Box)({
	width: "fit-content",
	borderWidth: "2px",
	borderStyle: "solid",
	borderColor: "rgb(124, 122, 111) rgb(50, 48, 39) rgb(36, 36, 29) rgb(59, 57, 46)",
});

const FlatSurface = styled(Box)({
	border: "4px solid rgb(81, 79, 69)",
});

const InnerBevel = styled(Box)({
	borderWidth: "2px",
	borderStyle: "solid",
	borderColor: "rgb(57, 55, 45)	rgb(59, 57, 46) rgb(96, 94, 87) rgb(52, 50, 40)",
	"& img": {
		verticalAlign: "middle",
	},
});

export const ImageBorder: React.FC<PropsWithChildren> = ({ children }) => (
	<OuterBevel>
		<FlatSurface>
			<InnerBevel>{children}</InnerBevel>
		</FlatSurface>
	</OuterBevel>
);
