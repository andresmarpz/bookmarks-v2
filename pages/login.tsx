import Box from '@/components/Box';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { TextField } from '@/components/TextField';
import { useState } from 'react';
import { styled } from 'stitches.config';
import { supabase } from 'utils/supabaseClient';
import Note from '@/components/Note';
import { useStore } from '@/management/Store';
import { useRouter } from 'next/dist/client/router';

const Form = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    border: '1px solid $colors$accent3',
    borderRadius: 4,
    padding: 20
});

type Note = 'Success' | 'Error';

export default function Login() {
    const { session } = useStore();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState<Note>();
    const { query } = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!email || loading) return;

        setLoading(true);
        const { error } = await supabase.auth.signIn(
            { email },
            {
                redirectTo: String(query.next)
            }
        );

        setLoading(false);
        if (error) {
            setNote('Error');
            return;
        }

        setNote('Success');
        setEmail('');
    };

    if (session)
        return (
            <h1 style={{ textAlign: 'center' }}>You are already logged in.</h1>
        );

    return (
        <Box
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '400px',
                marginTop: '150px'
            }}>
            <h1 style={{ fontSize: '3em', textAlign: 'center' }}>
                Log In to Bookmarks
            </h1>
            <Form onSubmit={handleSubmit}>
                <Box>
                    <TextField
                        css={{ width: '100%' }}
                        placeholder="your@email.com"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Box>

                <Button
                    css={{
                        height: 36,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                    disabled={loading}
                    color="black">
                    {!loading ? 'Send magic link' : <Spinner />}
                </Button>
                {note == undefined ? (
                    ''
                ) : note == 'Error' ? (
                    <Note status="error">
                        Error: Something went wrong. Please try again.
                    </Note>
                ) : (
                    <Note status="success">
                        Success: Your magic link has been sent.
                    </Note>
                )}
            </Form>
        </Box>
    );
}
