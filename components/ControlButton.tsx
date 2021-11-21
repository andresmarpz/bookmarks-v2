import { CSS } from '@stitches/react/types/css-util';
import React from 'react';
import Button from './Button';

const ControlButton = (
    props: React.PropsWithChildren<{
        css?: CSS;
        show: boolean;
        onClick?: () => void;
    }>
) => {
    return (
        <Button
            color="black"
            css={{
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 99,
                ...props.css
            }}
            display={{
                '@initial': 'flex',
                '@bp1': props.show ? 'flex' : 'hidden'
            }}
            onClick={props.onClick}>
            {props.children}
        </Button>
    );
};

export default ControlButton;
