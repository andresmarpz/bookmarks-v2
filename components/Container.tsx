import { CSS } from '@stitches/react/types/css-util';
import React from 'react';
import Box from './Box';

const Container = (props: React.PropsWithChildren<{ css?: CSS }>) => {
    return (
        <Box css={{ maxWidth: 1024, margin: 'auto', ...props.css }}>
            {props.children}
        </Box>
    );
};

export default Container;
