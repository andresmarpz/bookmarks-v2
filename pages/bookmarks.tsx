import Box from '@/components/Box';
import Container from '@/components/Container';
import { useStore } from '@/management/Store';
import { User } from '@supabase/gotrue-js';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import { supabase } from 'utils/supabaseClient';
import { Collection } from '../types';
import * as Separator from '@radix-ui/react-separator';
import Bookmark from '@/components/Bookmark';
import { Bookmark as TBookmark } from '../types';
import Search from '@/components/Search';
import AddPopover from '@/components/AddPopover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import CollectionList from '@/components/CollectionList';
import BookmarkList from '@/components/BookmarkList';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

    if (!user) {
        return {
            redirect: {
                destination: '/login?next=%2Fstore',
                permanent: false
            }
        };
    }

    return { props: { user } };
}

type StoreProps = {
    user: User;
};

const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'LightYellow',
    variants: {
        display: {
            flex: {
                display: 'flex'
            },
            none: {
                display: 'none'
            }
        }
    }
});

const StyledList = styled(TabsPrimitive.List, {
    flexShrink: 0,
    display: 'flex',
    borderBottom: `1px solid $colors$accent6`
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    padding: '0 20px',
    height: 45,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    lineHeight: 1,
    color: '$accent5',
    userSelect: 'none',
    '&[data-state="active"]': {
        color: '$foreground',
        boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor'
    },
    '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` }
});

const StyledContent = styled(TabsPrimitive.Content, {
    flexGrow: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    outline: 'none',
    '&:focus': { boxShadow: `0 0 0 2px black` }
});

const StyledSeparator = styled(Separator.Root, {
    width: 1,
    backgroundColor: '$accent3'
});

export default function Store({ user }: StoreProps) {
    const collections = useStore((state) => state.collections);
    const [collection, setCollection] = useState<Collection>(collections[0]);
    const [search, setSearch] = useState('');

    const filter = () => {
        return [];
    };

    useEffect(() => {
        if (!collection) setCollection(collections[0]);
        if (collection) {
            const update = collections.find((c) => c.id === collection.id);
            if (update) setCollection(update);
        }
    }, [collections]);

    return (
        <Container css={{ height: '100vh' }}>
            <StyledTabs
                defaultValue="tab1"
                display={{
                    '@initial': 'flex',
                    '@bp1': 'none'
                }}>
                <StyledList>
                    <StyledTrigger value="tab1">Collections</StyledTrigger>
                    <StyledTrigger value="tab2">Bookmarks</StyledTrigger>
                </StyledList>
                <StyledContent value="tab1">
                    <CollectionList
                        collections={collections}
                        currentCollection={collection}
                        setCollection={setCollection}
                    />
                </StyledContent>
                <StyledContent value="tab2">
                    <BookmarkList user={user} collection={collection} />
                </StyledContent>
            </StyledTabs>
            <Box
                css={{
                    height: '100%'
                }}
                display={{
                    '@initial': 'none',
                    '@bp1': 'flex'
                }}>
                <CollectionList
                    collections={collections}
                    currentCollection={collection}
                    setCollection={setCollection}
                />
                <StyledSeparator orientation="vertical" />
                <BookmarkList collection={collection} user={user} />
            </Box>
        </Container>
    );
}
