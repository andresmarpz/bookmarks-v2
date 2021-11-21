import Box from '@/components/Box';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Spinner from '@/components/Spinner';
import Text from '@/components/Text';
import { TextField } from '@/components/TextField';
import { useStore } from '@/management/Store';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import { supabase } from 'utils/supabaseClient';

const Form = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid $accent3',
    borderRadius: 4
});

type Length = {
    min: number;
    max: number;
};

type UserSettingProps = {
    field: string;
    setField: (arg: any) => void;
    length: Length;
    defaultValue?: any | null;
};

const UserSetting = ({
    field,
    setField,
    length,
    defaultValue
}: UserSettingProps) => {
    const { session } = useStore();

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState(
        defaultValue == undefined ? '' : defaultValue
    );

    useEffect(() => {
        setText(defaultValue);
    }, [defaultValue]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (
            !text ||
            text.length < length.min ||
            text.length > length.max ||
            loading
        )
            return;

        setLoading(true);

        const { error } = await supabase.from('profiles').upsert(
            {
                id: session!.user!.id,
                [field]: text,
                updated_at: new Date()
            },
            { returning: 'minimal' }
        );

        setLoading(false);
        if (error) return;

        setField(text);
    };

    return (
        <Box
            css={{
                paddingX: 20,
                paddingY: 10,
                marginTop: 10
            }}>
            <Form onSubmit={handleSubmit}>
                <Box
                    css={{
                        padding: 15,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Text size="xl" weight="500">
                        Username
                    </Text>
                    <TextField
                        size="medium"
                        css={{ maxWidth: 250, marginY: 10 }}
                        value={text == null ? '' : text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Box>

                <Box
                    css={{
                        borderTop: '1px solid $colors$accent3',
                        backgroundColor: '$accent1',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingX: 15,
                        paddingY: 8
                    }}
                    flex>
                    <Text>Please use 32 characters at maximum.</Text>
                    <Button
                        css={{
                            height: 36,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingY: 0
                        }}
                        disabled={loading}
                        color="black">
                        {!loading ? 'Save' : <Spinner />}
                    </Button>
                </Box>
            </Form>
        </Box>
    );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

    if (!user) {
        return {
            redirect: {
                destination: '/login?next=%2Fsettings',
                permanent: false
            }
        };
    }

    return { props: {} };
}

export default function Settings() {
    const { user, username, setUsername } = useStore();

    if (!user) return <div></div>;

    return (
        <Container>
            <Box>
                <UserSetting
                    field="username"
                    setField={setUsername}
                    length={{ min: 3, max: 32 }}
                    defaultValue={username}
                />
            </Box>
        </Container>
    );
}
