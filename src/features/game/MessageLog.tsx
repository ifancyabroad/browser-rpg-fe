import { Box, Container, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { IMessage } from "common/types";
import { useEffect, useRef, useState } from "react";
import { socket } from "socket";

export const MessageLog: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
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
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [messages.length]);

	useEffect(() => {
		function onMessageEvent(data: IMessage) {
			setMessages((previous) => [...previous, data]);
		}

		socket.on("message", onMessageEvent);

		return () => {
			socket.off("message", onMessageEvent);
		};
	}, []);

	const latestMessages = [...messages].slice(-8);

	return (
		<Box py={2}>
			<Container maxWidth={false}>
				<Box
					ref={ref}
					sx={{
						height: 192,
						overflowY: "hidden",
					}}
				>
					{latestMessages.map((data, index) => (
						<Typography key={index} color={data.color}>
							{data.username && (
								<Box component="span" color="text.secondary">
									[{data.username}]{" "}
								</Box>
							)}
							{data.message}
						</Typography>
					))}
				</Box>
			</Container>
		</Box>
	);
};
