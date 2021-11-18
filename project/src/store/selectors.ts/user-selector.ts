import { ReviewProp } from '../../mock/review';
import { AuthoriztionProps } from '../../utils/constants';
import { UserDataProps } from '../reducer';
import { NameSpace, RootStateProps } from '../reducers/root-reducer';

export const getAuthorizationStatus = (state: RootStateProps):AuthoriztionProps => state[NameSpace.user].authorizationStatus;

export const getUserData = (state: RootStateProps):UserDataProps => state[NameSpace.user].userData;

export const getCurrentComments = (state: RootStateProps):ReviewProp[] => state[NameSpace.user].currentComments;

export const getCurrentRating = (state: RootStateProps):number => state[NameSpace.user].currentRating;

export const getIsFavorite = (state: RootStateProps):boolean => state[NameSpace.user].isFavorite;

export const getActiveOfferId = (state: RootStateProps): number | null => state[NameSpace.user].activeOfferId;
