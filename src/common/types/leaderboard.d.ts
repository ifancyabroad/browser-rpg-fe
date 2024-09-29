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
	isUser: boolean;
}

export interface ILeaderboardPayload {
	showUserCharacters: boolean;
}
