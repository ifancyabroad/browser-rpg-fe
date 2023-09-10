export interface IUser {
	email: string;
}

export interface ISession {
	session: boolean;
}

export interface ILoginPayload {
	email: string;
	password: string;
}

export * from "./character";
