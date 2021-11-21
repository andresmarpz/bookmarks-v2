import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { useEffect } from 'react';
import { supabase } from 'utils/supabaseClient';
import { useStore } from '@/management/Store';
import { globalStyles } from 'stitches.config';
import { User, Session } from '@supabase/supabase-js';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Collection } from '../types';
import { IdProvider } from '@radix-ui/react-id';

function App({ Component, pageProps }: AppProps) {
    globalStyles();

    const { setCollections, setUser, setSession, setUsername } = useStore();

    const updateState = async (session?: Session | null) => {
        if (session) {
            setSession(session);
            setUser(session.user);

            await supabase
                .from('profiles')
                .select('username')
                .eq('id', session.user!.id)
                .single()
                .then(({ data }) => {
                    if (data) setUsername(data.username);
                });

            await supabase
                .from('collections')
                .select('id, label, bookmarks')
                .eq('ownerid', session.user?.id)
                .then(({ data }) => {
                    if (data) {
                        let collections: Collection[] = [];
                        data.forEach((collection: Collection) =>
                            collections.push(collection)
                        );
                        setCollections(
                            collections.sort((a, b) => (a.id < b.id ? -1 : 1))
                        );
                    }
                });
        }
    };

    useEffect(() => {
        const currentSession = supabase.auth.session();

        if (currentSession) {
            updateState(currentSession);
        }

        const { data } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                updateState(newSession);

                fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify({ event, session: newSession })
                });
            }
        );

        Router.events.on('routeChangeStart', () => NProgress.start());
        Router.events.on('routeChangeComplete', () => NProgress.done());
        Router.events.on('routeChangeError', () => NProgress.done());
        return () => {
            if (data) data.unsubscribe();
            Router.events.off('routeChangeStart', () => NProgress.start());
            Router.events.off('routeChangeComplete', () => NProgress.done());
            Router.events.off('routeChangeError', () => NProgress.done());
        };
    }, []);

    return (
        <Layout>
            <IdProvider>
                <Component {...pageProps} />
            </IdProvider>
        </Layout>
    );
}

export default App;
