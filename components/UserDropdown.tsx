import { useStore } from '@/management/Store';
import Button from '@/components/Button';
import { useRouter } from 'next/dist/client/router';
import Box from '@/components/Box';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from 'stitches.config';
import { CSS } from '@stitches/react/types/css-util';
import { supabase } from 'utils/supabaseClient';
import Gear from './svgs/Gear';
import Exit from './svgs/Exit';
import { keyframes } from '@stitches/react';
import DownArrow from './svgs/DownArrow';

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

const StyledTrigger = styled(DropdownMenu.Trigger, {
    backgroundColor: '$accent1',
    padding: '8px 12px',
    borderRadius: '4px',
    display: 'flex',
    gap: '4px',
    fontSize: '14px',
    border: 'none',
    transition: 'background-color 65ms ease-out',
    '&:hover': {
        backgroundColor: '$accent1'
    },
    color: '$accent8'
});

const StyledContent = styled(DropdownMenu.Content, {
    backgroundColor: '$accent1',
    minWidth: 165,
    borderRadius: 4,
    fontSize: 14,
    boxShadow:
        '0 2px 2px hsl(0deg 0% 0% / 0.075), 0 3px 5px hsl(2deg 0% 0% / 0.08)',
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
    }
});

const itemStyle: CSS = {
    padding: '5px 10px',
    cursor: 'default',
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    '&:focus': {
        backgroundColor: '$blue1'
    }
};

const StyledItem = styled(DropdownMenu.Item, { ...itemStyle });

const StyledSeparator = styled(DropdownMenu.Separator, {
    height: 1,
    backgroundColor: '$accent4',
    margin: 5
});

const UserDropdown = () => {
    const router = useRouter();
    const { username, session } = useStore();

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (!session)
        return <Button onClick={() => router.push('/login')}>Login</Button>;

    return (
        <DropdownMenu.Root>
            <StyledTrigger css={{ fontSize: '15px', color: '$accent8' }}>
                {username == null
                    ? session!.user == null
                        ? ''
                        : session.user.email
                    : username}
                <Box>
                    <DownArrow />
                </Box>
            </StyledTrigger>
            <StyledContent sideOffset={5} loop css={{ padding: '6px 0px' }}>
                <StyledItem onClick={() => router.push('/settings')}>
                    <Gear />
                    Settings
                </StyledItem>
                <StyledSeparator />
                <StyledItem onClick={signOut}>
                    <Exit />
                    Sign Out
                </StyledItem>
            </StyledContent>
        </DropdownMenu.Root>
    );
};

export default UserDropdown;
