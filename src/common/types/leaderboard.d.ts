export interface ILeaderboardCharacter {
	id: string;
	name: string;
	level: number;
	characterClass: {
		name: string;
		icon: string;
	};
	slainBy: string;
	status: string;
	kills: number;
	maxBattleLevel: number;
	username: string;
	isUser: boolean;
}

export interface ILeaderboardPayload {
	type: string;
	characterClass: string;
}
