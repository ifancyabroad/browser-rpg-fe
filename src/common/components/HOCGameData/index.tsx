import { Fragment, useEffect } from "react";
import { PageLoader } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { fetchCharacter, getIsLoaded } from "features/character";
import { openErrorModal } from "features/modals";

interface IProps {
	children: React.ReactNode;
}

export const HOCGameData: React.FC<IProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const isLoaded = useAppSelector(getIsLoaded);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchCharacter()).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
	}, [dispatch]);

	return isLoaded ? <Fragment>{children}</Fragment> : <PageLoader />;
};
