export interface IUser {
	id: string;
	username: string;
	email?: string;
}

export interface ISession {
	session: boolean;
}

export interface IRegisterGuestPayload {
	username: string;
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
