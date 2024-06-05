import { Box, Link, Typography, alpha, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getCurrentRoom, getIsActiveRoom, setPath } from "./dungeonSlice";
import { ROOM_ACTION_NAME_MAP, RoomType } from "common/utils";
import { useDungeonContext } from "common/context";
import { RoomTypeIcon } from "common/components";
import { Fragment } from "react";

const Wrapper = styled("div")(({ theme }) => ({
	position: "absolute",
	top: 16,
	right: 16,
	zIndex: 1,
	border: `1px solid ${theme.palette.grey[300]}`,
	backgroundColor: alpha(theme.palette.background.default, 0.8),
	minWidth: 200,
}));

const RoomInfo = styled("div")(({ theme }) => ({
	minHeight: "60px",
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	padding: theme.spacing(1),

	".window": {
		height: "40px",
	},
}));

export const RoomWindow: React.FC = () => {
	const dispatch = useAppDispatch();
	const room = useAppSelector(getCurrentRoom);
	const roomType = room ? room.type : RoomType.Empty;
	const isActionRoom = useAppSelector(getIsActiveRoom);
	const dungeonContext = useDungeonContext();

	const handleLocation = () => {
		dispatch(setPath([]));

		if (isActionRoom) {
			dungeonContext.dispatch({ type: "OPEN", payload: roomType });
		}
	};

	return (
		<Wrapper>
			<Box p={1} borderBottom={1} borderColor="grey.300">
				<Typography>Current Location</Typography>
			</Box>
			<RoomInfo>
				{isActionRoom ? (
					<Fragment>
						<RoomTypeIcon type={roomType} className="window" />
						<Link component="button" onClick={handleLocation}>
							{ROOM_ACTION_NAME_MAP[roomType as RoomType]}
						</Link>
					</Fragment>
				) : (
					<Typography fontStyle="italic">Empty</Typography>
				)}
			</RoomInfo>
		</Wrapper>
	);
};
