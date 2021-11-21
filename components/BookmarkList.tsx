import { User } from '@supabase/gotrue-js';
import { styled } from 'stitches.config';
import { Collection } from '../types';
import AddPopover from './AddPopover';
import Bookmark from './Bookmark';
import Box from './Box';
import Search from './Search';

type Props = {
    collection?: Collection;
    user: User;
};

const BookmarkList = ({ collection, user }: Props) => {
    if (!collection) return <div></div>;

    return (
        <Box
            css={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
            <Box
                css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10,
                    alignItems: 'center',
                    borderBottom: '1px solid $accent3',
                    padding: 15
                }}>
                <Search />
                <Box>
                    <AddPopover userid={user.id} collection={collection} />
                </Box>
            </Box>
            {collection.bookmarks.map((bookmark, index) => (
                <Bookmark
                    key={'b' + index}
                    collection={collection}
                    bookmark={bookmark}></Bookmark>
            ))}
        </Box>
    );
};

export default BookmarkList;
