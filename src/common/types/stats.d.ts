export interface IHistoryCharacter {
	id: string;
	name: string;
	level: number;
	kills: number;
	day: number;
	status: string;
	characterClass: string;
	updatedAt: string;
}

export interface IOverallStats {
	heroes: number;
	kills: number;
	deaths: number;
	record: number;
	victories: number;
	topHero: {
		id: string;
		name: string;
	};
}

export interface IHistoryPayload {
	page?: number;
	limit?: number;
	sort?: string;
	order?: "asc" | "desc";
}

export interface IHistoryResponse {
	history: IHistoryCharacter[];
	count: number;
	page: number;
}
