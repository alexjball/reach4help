import algoliasearch from 'algoliasearch/lite';
import { Button } from 'antd';
import React, { useState } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import {
  Control,
  GeoSearch,
  GoogleMapsLoader,
  Marker,
} from 'react-instantsearch-dom-maps';
import LoadingWrapper from 'src/components/LoadingComponent/LoadingComponent';
import { useSearchKey } from 'src/ducks/search/operations';

// const Debug = connectHits(({ hits }) => (
//   <ul>
//     {hits.map((hit, i) => (
//       <li key={i}>{JSON.stringify(hit._geoloc)}</li>
//     ))}
//   </ul>
// ));

const PostInfoDisplay = ({ post }) => {
  const { userSnapshot, description, title } = post;
  const { displayName, displayPicture } = userSnapshot;
  const onClickHandler = () => {
    alert('this should create a specific offer');
  };
  //     dispatch(
  //       setOffer(
  //         {
  //           cavUserRef: profileState.userRef,
  //           pinUserRef:
  //             pendingRequests.data[expandedRequestId]
  //               .pinUserRef,
  //           requestRef: firestore.collection('requests').doc(expandedRequestId),
  //           cavUserSnapshot: profileState.profile,
  //           requestSnapshot: pendingRequests.data[
  //             expandedRequestId
  //           ].getRequest(),
  //           message: t(
  //             'modules.requests.containers.FindRequestsContainer.want_to_help',
  //           ),
  //           status: action ? OfferStatus.pending : OfferStatus.cavDeclined,
  //         },
  //         undefined,
  //         phoneNumber,
  //       ),
  //     );

  return (
    <div>
      <div style={{ display: 'flex', zIndex: 100 }}>
        <h2> {displayName}</h2>
        <img src={displayPicture} alt={displayName} />
      </div>
      <hr />
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={onClickHandler}>Offer help</Button>
    </div>
  );
};

const FindRequestsContainer: React.FC = () => {
  const searchKey = useSearchKey();
  const [selectedMarker, setSelectedMarker] = useState();

  if (!searchKey) {
    return <LoadingWrapper />;
  }

  const searchClient = algoliasearch(searchKey.appId, searchKey.searchKey);

  // Based on
  // https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/geo-search/react/
  // Data retrieval and UI component are tightly coupled
  const instantSearchHeight = selectedMarker ? '300px' : '500px';
  return (
    <div style={{ height: '100%' }}>
      <InstantSearch
        // indexName="airports"
        indexName={searchKey.indexName}
        searchClient={searchClient}
      >
        <div style={{ height: instantSearchHeight }}>
          <GoogleMapsLoader
            // endpoint="https://maps.googleapis.com/maps/api/js?v3.40"
            apiKey={process.env.REACT_APP_GMAPS_API_KEY}
          >
            {google => (
              <GeoSearch
                enableRefineOnMapMove={false}
                google={google}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                initialPosition={{ lat: 42.3684331, lng: -71.0373524 }}
                initialZoom={8}
              >
                {({ hits }) => (
                  <div>
                    <Control />
                    {hits.map(hit => (
                      <Marker
                        key={hit.objectID}
                        hit={hit}
                        onClick={() => {
                          setSelectedMarker(hit);
                        }}
                      />
                    ))}
                  </div>
                )}
              </GeoSearch>
            )}
          </GoogleMapsLoader>
        </div>
        {/* <Debug /> */}
      </InstantSearch>
      {selectedMarker && <PostInfoDisplay post={selectedMarker} />}
    </div>
  );
};

export default FindRequestsContainer;
