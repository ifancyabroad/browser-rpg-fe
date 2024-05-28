import { Box, ButtonBase, Typography, alpha, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getCurrentRoom, getIsActiveRoom, setPath } from "./dungeonSlice";
import { ROOM_ACTION_NAME_MAP, RoomType } from "common/utils";
import { useDungeonContext } from "common/context";
import { RoomTypeIcon } from "common/components";

const Wrapper = styled("div")(({ theme }) => ({
	position: "absolute",
	top: 16,
	right: 24,
	zIndex: 1,
	border: `1px solid ${theme.palette.grey[300]}`,
	backgroundColor: alpha(theme.palette.background.default, 0.8),
	minWidth: 250,
}));

const RoomInfo = styled("div")(({ theme }) => ({
	minHeight: "80px",
	width: "100%",
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(2),
}));

const RoomButton = styled(ButtonBase)(({ theme }) => ({
	minHeight: "80px",
	width: "100%",
	justifyContent: "flex-start",
	gap: theme.spacing(2),
	padding: theme.spacing(2),

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
			<Box p={2} borderBottom={1} borderColor="grey.300">
				<Typography>Current Location</Typography>
			</Box>
			{isActionRoom ? (
				<RoomButton onClick={handleLocation}>
					<RoomTypeIcon type={roomType} className="window" />
					<Typography color="text.secondary">{ROOM_ACTION_NAME_MAP[roomType as RoomType]}</Typography>
				</RoomButton>
			) : (
				<RoomInfo>
					<Typography fontStyle="italic">Empty</Typography>
				</RoomInfo>
			)}
		</Wrapper>
	);
};
