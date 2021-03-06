import { IPost, Post } from 'src/models/posts';
import { User } from 'src/models/users';

import {
  createGeneralRequest,
  observeMyRequests as observeMyRequestsFunc,
  setGeneralRequest,
} from './functions';
import {
  CHANGE_MODAL,
  OBSERVE_MY_REQUESTS,
  RESET_SET,
  SET,
  SET_TEMP_REQUEST,
} from './types';

export const observeMyRequests = (
  dispatch: Function,
  {
    status,
    userRef,
  }: {
    status: string | null;
    userRef: firebase.firestore.DocumentReference<User>;
  },
): Function => {
  dispatch({
    type: OBSERVE_MY_REQUESTS,
    observer: observeMyRequestsFunc,
    payload: {
      requestingHelp: true,
      status,
      userRef,
    },
  });

  return () =>
    dispatch({
      type: OBSERVE_MY_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_MY_REQUESTS,
    });
};

export const setRequest = (
  payload: IPost,
  postId?: string,
  phoneNumber?: string | null,
) => (dispatch: Function) => {
  const postPayload = Post.factory({
    ...payload,
  });

  return dispatch({
    type: phoneNumber ? SET : SET_TEMP_REQUEST,
    payload: {
      postPayload,
      postId,
    },
    firebase: phoneNumber
      ? postId
        ? setGeneralRequest
        : createGeneralRequest
      : null,
  });
};

export const resetSetRequestState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_SET,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });
