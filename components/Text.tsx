import { styled } from 'stitches.config';

const Text = styled('span', {
    variants: {
        color: {
            black: {
                color: 'black'
            },
            blue: {
                color: '$blue3'
            },
            red: {
                color: '$red3'
            },
            white: {
                color: 'White'
            }
        },
        size: {
            xs: {
                fontSize: 12
            },
            s: {
                fontSize: 14
            },
            m: {
                fontSize: 16
            },
            l: {
                fontSize: 20
            },
            xl: {
                fontSize: 24
            },
            xxl: {
                fontSize: 30
            },
            xxxl: {
                fontSize: 42
            }
        },
        weight: {
            100: {
                fontWeight: 100
            },
            200: {
                fontWeight: 200
            },
            300: {
                fontWeight: 300
            },
            400: {
                fontWeight: 400
            },
            500: {
                fontWeight: 500
            },
            600: {
                fontWeight: 600
            },
            700: {
                fontWeight: 700
            }
        }
    },
    defaultVariants: {
        color: 'black',
        size: 's',
        weight: '500'
    }
});

export default Text;
