import { styled } from 'stitches.config';
import { Collection } from '../types';
import Box from './Box';
import * as Separator from '@radix-ui/react-separator';
import { CSS } from '@stitches/react';

const Collection = styled(Box, {
    textAlign: 'left',
    height: 30,
    width: '100%',
    minWidth: 200,
    padding: '5px 10px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    marginY: 2,
    cursor: 'pointer',
    borderRadius: 6,
    transition: 'background-color 200ms',

    variants: {
        selected: {
            true: {
                backgroundColor: '$foregrund',
                color: 'white'
            },
            false: {
                '&:hover': {
                    backgroundColor: '$accent2'
                }
            }
        }
    }
});

type Props = {
    collections: Collection[];
    currentCollection?: Collection;
    setCollection: (c: Collection) => void;
    css?: CSS;
};

const CollectionList = ({
    collections,
    currentCollection,
    setCollection
}: Props) => {
    return (
        <Box
            css={{ height: '100%' }}
            maxWidth={{
                '@initial': '100',
                '@bp1': '300'
            }}>
            <Box
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 20
                }}>
                Collections
                {collections.length > 0 ? (
                    collections.map((collection, index) => (
                        <Collection
                            key={'c' + index}
                            onClick={() => setCollection(collection)}
                            selected={collection.id == currentCollection?.id}>
                            <Box>{collection.label}</Box>
                        </Collection>
                    ))
                ) : (
                    <Box>
                        <Collection className={'skeleton-box'} />
                        <Collection
                            css={{ marginTop: 4 }}
                            className={'skeleton-box'}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CollectionList;
