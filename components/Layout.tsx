import { useStore } from '@/management/Store';
import React, { useEffect } from 'react';
import { supabase } from 'utils/supabaseClient';
import Box from './Box';
import Navigation from './Navigation';

const Layout = (props: React.PropsWithChildren<{}>) => {
    const { session, setSession } = useStore();

    useEffect(() => {
        setSession(supabase.auth.session()!);

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session!);
        });
    }, []);

    return (
        <Box
            css={{
                minHeight: '100vh'
            }}>
            <Navigation />
            {props.children}
        </Box>
    );
};

export default Layout;
