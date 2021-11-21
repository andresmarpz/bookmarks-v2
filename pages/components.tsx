import Box from '@/components/Box';
import Button from '@/components/Button';

export default function Components() {
    return (
        <Box
            css={{
                margin: 20,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
            <Button>Default Button Small</Button>
            <Button size="large">Default Button Large</Button>
            <Button color="blue">Blue Button Small</Button>
            <Button color="blue" size="large">
                Blue Button Large
            </Button>
        </Box>
    );
}
