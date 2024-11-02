export interface IUser {
	username: string;
	email: string;
}

export interface ISession {
	session: boolean;
}

export interface IRegisterPayload {
	username: string;
	email: string;
	password: string;
}

export interface ILoginPayload {
	email: string;
	password: string;
}
