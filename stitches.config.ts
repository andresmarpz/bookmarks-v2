import { createStitches, globalCss, keyframes } from '@stitches/react';

export const { styled, getCssText } = createStitches({
    theme: {
        fonts: {
            system: 'system-ui'
        },
        colors: {
            background: '#FFF',
            accent1: '#FAFAFA',
            accent2: '#F4F5F6',
            accent3: '#EAEAEA',
            accent4: '#CFCFCF',
            accent5: '#868E96',
            accent6: '#888',
            accent7: '#666',
            accent8: '#333',
            accent9: '#111',
            foregrund: '#000',
            gray9: '#383838',
            blue05: '#DEEBFF',
            blue1: '#D3E5FF',
            blue2: '#3291FF',
            blue3: '#0070F3',
            blue4: '#0761D1',
            red1: '#F7D4D6',
            red2: '#FF1A1A',
            red3: '#E00',
            red4: '#C50000'
        },
        fontSizes: {
            1: '13px',
            2: '15px',
            3: '17px'
        }
    },
    utils: {
        paddingY: (value: number) => ({
            paddingTop: value,
            paddingBottom: value
        }),
        paddingX: (value: number) => ({
            paddingLeft: value,
            paddingRight: value
        }),
        marginY: (value: number) => ({
            marginTop: value,
            marginBottom: value
        }),
        marginX: (value: number) => ({
            marginLeft: value,
            marginRight: value
        })
    },
    media: {
        bp1: '(min-width: 640px)',
        bp2: '(min-width: 768px)',
        bp3: '(min-width: 1024px)'
    }
});

const shimmer = keyframes({
    '100%': {
        transform: 'translateX(100%)'
    }
});

export const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box'
    },
    body: {
        padding: 0,
        margin: 0,
        fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", sans-serif'
    },
    '@font-face': {
        fontFamily: 'Inter',
        fontDisplay: 'optional',
        src: 'url("/fonts/inter-var-latin.woff2")'
    },
    '.skeleton-box': {
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#e2e8f0',
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            transform: 'translateX(-100%)',
            backgroundImage:
                'linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))',
            animation: `${shimmer} 3s infinite`,
            content: ''
        }
    }
});
