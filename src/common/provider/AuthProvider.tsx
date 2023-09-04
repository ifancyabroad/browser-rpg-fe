import { useEffect, useState } from "react";
import { PageLoader } from "common/components";
import { AuthContext } from "common/context";
import { IUser } from "common/types";

interface IProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setUser(null); // TODO: Add session flow
		setIsLoaded(true);
	}, []);

	if (!isLoaded) {
		return <PageLoader />;
	}

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
