import { styled } from 'stitches.config';
import Box from '@/components/Box';
import Container from '@/components/Container';

const Hero = styled('div', {
    margin: '30px'
});

export default function Home() {
    return (
        <Container>
            <Box
                css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <h1>Home</h1>
            </Box>
        </Container>
    );
}
