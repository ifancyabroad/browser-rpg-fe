import { Link } from "@mui/material";
import { ReactComponent as CoffeeIcon } from "assets/images/icons/bmc-logo.svg";

export const CoffeeButton: React.FC = () => {
	return (
		<Link
			fontSize="14px"
			component="a"
			href="https://buymeacoffee.com/durfu"
			target="_blank"
			rel="noopener noreferrer"
			display="flex"
			alignItems="center"
			gap={1}
		>
			<CoffeeIcon style={{ width: "20px", height: "20px" }} />
			Buy me a coffee
		</Link>
	);
};
