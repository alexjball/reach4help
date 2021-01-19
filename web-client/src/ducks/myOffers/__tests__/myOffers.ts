import { IPost, PostStatus } from 'src/models/posts';
import configureStore from 'src/store';

import { setRequest } from '../actions';

let store;
beforeEach(() => {
  store = configureStore();
});

it('can create a post', async () => {
  const phoneNumber = '555-555-5555';

  const newPost = {
    isResponse: false,
    requestingHelp: true,
    parentSnapshot: null,
    parentRef: null,
    status: PostStatus.pending,
    creatorGivenRating: 0,
    parentCreatorGivenRating: 0,
    updateSeenBy: [],
    creatorRatedAt: null,
    parentCreatorRatedAt: null,
    positiveResponseCount: 0,
    negativeResponseCount: 0,
    title: 'test title',
    body: 'test body',
    description: '', // request.description,
    creatorRef: null!, // profileState.userRef,
    streetAddress: '55 street NY',
    latLng: null!, // new firestore.GeoPoint(coords.latitude, coords.longitude),
    creatorSnapshot: null!, // profileState.profile.toObject(),
  };

  await store.dispatch(setRequest(newPost as IPost, undefined, phoneNumber));
});
