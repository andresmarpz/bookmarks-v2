import { useStore } from '@/management/Store';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { keyframes } from '@stitches/react';
import { useState } from 'react';
import { styled } from 'stitches.config';
import { supabase } from 'utils/supabaseClient';
import { Bookmark, Collection } from '../types';
import Button from './Button';
import Flex from './Flex';
import Spinner from './Spinner';
import Plus from './svgs/Plus';
import { TextField } from './TextField';
import { v4 as uuid } from 'uuid';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' }
});

const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' }
});

const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' }
});

const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' }
});

const StyledContent = styled(PopoverPrimitive.Content, {
    borderRadius: 4,
    padding: 15,
    width: 260,
    backgroundColor: 'white',
    boxShadow:
        'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { animationName: slideDownAndFade },
            '&[data-side="right"]': { animationName: slideLeftAndFade },
            '&[data-side="bottom"]': { animationName: slideUpAndFade },
            '&[data-side="left"]': { animationName: slideRightAndFade }
        }
    },
    '&:focus': {
        boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px $colors$blue1`
    }
});

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = StyledContent;

const AddButton = styled('button', {
    borderRadius: 4,
    backgroundColor: '$blue1',
    border: 'none',
    padding: '8px 10px'
});

const AddPopover = (props: { collection: Collection; userid: string }) => {
    const { addBookmark } = useStore();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        if (!url) {
            setLoading(false);
            return;
        }

        const bookmark: Bookmark = {
            label: url,
            href: url,
            id: uuid()
        };

        const { error } = await supabase.from('collections').upsert({
            ownerid: props.userid,
            id: props.collection.id,
            bookmarks: [...props.collection.bookmarks, bookmark]
        });
        setLoading(false);
        if (error) alert(error);

        addBookmark(props.collection, bookmark);
        setUrl('');
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <AddButton>
                    <Plus />
                </AddButton>
            </PopoverTrigger>
            <PopoverContent sideOffset={4}>
                URL
                <form onSubmit={onSubmit}>
                    <TextField
                        css={{ width: '100%' }}
                        placeholder="https://"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Flex justifyContent="flex-end">
                        <Button
                            css={{ marginTop: 4, width: '60px' }}
                            color="black">
                            {loading ? (
                                <Spinner width={16} height={16} />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Flex>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default AddPopover;
