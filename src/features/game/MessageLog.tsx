import { Box, Container, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { IMessage } from "common/types";
import { useEffect, useState } from "react";
import { socket } from "socket";

export const MessageLog: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const [messages, setMessages] = useState<IMessage[]>([
		{
			color: "primary.main",
			message: `Welcome to the game, ${character?.name} the ${character?.characterClass.name}`,
		},
		{
			color: "info.light",
			message: `Check here to see events as they happen in the world of Browser Heroes!`,
		},
	]);

	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		function onMessageEvent(data: IMessage) {
			setMessages((previous) => [...previous, data]);
		}

		socket.on("message", onMessageEvent);

		return () => {
			socket.off("message", onMessageEvent);
		};
	}, []);

	const latestMessages = [...messages].reverse().slice(0, 8);

	return (
		<Box py={2}>
			<Container maxWidth={false}>
				<Box
					sx={{
						height: 192,
						display: "flex",
						flexDirection: "column-reverse",
						overflowY: "hidden",
					}}
				>
					{latestMessages.map((data, index) => (
						<Typography key={index} color={data.color}>
							{data.message}
						</Typography>
					))}
				</Box>
			</Container>
		</Box>
	);
};
