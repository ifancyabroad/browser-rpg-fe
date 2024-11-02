export interface ILeaderboardCharacter {
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
	showUserCharacters: boolean;
}
