import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_SONGS } from '../../../api';
import { EMPTY_STRING } from '../../../constant/text';
import LibraryInformation from './libraryInformation';
import Songs from './songs';
import isEmpty from 'lodash/isEmpty';
import Loader from '../../common/loader';

const Library = (props) => {
    const { searchText = EMPTY_STRING } = props;
    const { data = {}, loading } = useQuery(GET_SONGS, { variables: { searchText } });
    const { songs = [] } = data;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="library">
            <LibraryInformation searchText={searchText} songsFound={!isEmpty(songs)} />
            <Songs songs={songs} searchText={searchText} />
        </div>
    );
};

export default Library;
