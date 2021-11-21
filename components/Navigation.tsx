import { useStore } from '@/management/Store';
import { useRouter } from 'next/dist/client/router';
import { styled } from 'stitches.config';
import { supabase } from 'utils/supabaseClient';
import Box from './Box';
import Button from './Button';
import Link from '@/components/Link';
import UserDropdown from './UserDropdown';

const Navigation = () => {
    const { user, session } = useStore();
    const router = useRouter();

    const push = () => {
        router.push('/login');
    };

    return (
        <Box css={{ borderBottom: '1px solid $colors$accent3' }}>
            <Box
                css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '30px',
                    maxWidth: 1024,
                    margin: 'auto'
                }}>
                <Box css={{ display: 'flex', gap: '4px' }}>
                    <Link label="Home" href="/" />
                    <Link label="Bookmarks" href="/bookmarks" />
                </Box>
                {!session ? (
                    <Button onClick={push} color="black">
                        Login
                    </Button>
                ) : (
                    <UserDropdown />
                )}
            </Box>
        </Box>
    );
};

export default Navigation;
