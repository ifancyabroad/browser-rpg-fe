import { Fragment, useEffect } from "react";
import { PageLoader } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { fetchCharacter, getIsLoaded } from "features/character";

interface IProps {
	children: React.ReactNode;
}

export const HOCGameData: React.FC<IProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const isLoaded = useAppSelector(getIsLoaded);

	useEffect(() => {
		dispatch(fetchCharacter());
	}, [dispatch]);

	return isLoaded ? <Fragment>{children}</Fragment> : <PageLoader />;
};
