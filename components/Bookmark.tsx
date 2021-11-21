import { useStore } from '@/management/Store';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import { supabase } from 'utils/supabaseClient';
import { Bookmark, Collection } from '../types';
import Box from './Box';
import ControlButton from './ControlButton';
import Spinner from './Spinner';
import Trash from './svgs/Trash';

const StyledBookmark = styled(Box, {
    position: 'relative',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black',
    width: '100%',
    padding: 20,
    lineHeight: '30px',
    borderBottom: '1px solid $accent3',
    transition: 'background-color 120ms',
    '&:hover': {
        backgroundColor: '$accent2'
    }
});

type Props = {
    collection: Collection;
    bookmark: Bookmark;
};

const Bookmark = ({ collection, bookmark }: Props) => {
    const { collections, setCollections, user, removeBookmark } = useStore();
    const [controls, showControls] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const deleteSelf = async () => {
        setDeleting(true);
        const { error } = await supabase.from('collections').upsert({
            ownerid: user?.id,
            id: collection.id,
            bookmarks: collection.bookmarks.filter(
                (bm) => bm.id !== bookmark.id
            )
        });
        setDeleting(false);
        if (error) return;

        removeBookmark(collection, bookmark);
    };

    return (
        <StyledBookmark
            onMouseEnter={() => showControls(true)}
            onMouseLeave={() => showControls(false)}>
            <Box>{bookmark.label}</Box>
            <Box css={{ display: 'flex', gap: 10 }}>
                <ControlButton show={controls} onClick={deleteSelf}>
                    {deleting ? <Spinner width={15} height={15} /> : <Trash />}
                </ControlButton>
            </Box>
            <a
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    textSizeAdjust: '100%'
                }}
                href={bookmark.href}
                target="_blank"
                rel="noopener"
            />
        </StyledBookmark>
    );
};

export default Bookmark;
