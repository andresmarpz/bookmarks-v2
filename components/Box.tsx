import { styled } from 'stitches.config';

const Box = styled('div', {
    boxSizing: 'border-box',

    variants: {
        flex: {
            true: {
                display: 'flex'
            }
        },
        display: {
            flex: {
                display: 'flex'
            },
            none: {
                display: 'none'
            }
        },
        maxWidth: {
            100: {
                maxWidth: '100%'
            },
            300: {
                maxWidth: 300
            }
        }
    }
});

export default Box;
