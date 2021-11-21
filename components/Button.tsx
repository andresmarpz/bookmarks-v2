import * as React from 'react';
import { styled } from '../stitches.config';

const StyledButton = styled('button', {
    border: 'none',
    backgroundColor: 'transparent',
    padding: '5px 9px',
    color: '$accent7',
    borderRadius: '4px',

    variants: {
        color: {
            gray: {
                backgroundColor: '$accent3'
            },
            blue: {
                backgroundColor: '$blue3',
                color: '$accent1',
                transition: 'all 150ms ease-out',
                '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: '0 0 0 1px $colors$blue3',
                    color: '$blue3'
                }
            },
            red: {
                backgroundColor: '$red3',
                color: '$accent1'
            },
            black: {
                backgroundColor: '$foregrund',
                color: 'white',
                transition: 'all 150ms ease-out',
                '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: '0 0 0 1px $colors$accent9',
                    color: '$accent9'
                }
            }
        },
        size: {
            small: {
                fontSize: '14px'
            },
            large: {
                fontSize: '18px'
            }
        },
        transparent: {
            true: {
                backgroundColor: 'transparent',
                color: '$accent7'
            }
        },
        disabled: {
            true: {
                cursor: 'not-allowed'
            }
        },
        display: {
            hidden: {
                display: 'none'
            },
            block: {
                display: 'block'
            },
            flex: {
                display: 'flex'
            }
        }
    },

    defaultVariants: {
        color: 'gray',
        size: 'small'
    },

    compoundVariants: [
        {
            color: 'black',
            disabled: true,
            css: {
                backgroundColor: '$accent9'
            }
        }
    ]
});

type ButtonProps = React.ComponentProps<typeof StyledButton> & {};

const Button = ({ ...rest }: ButtonProps) => (
    <StyledButton {...rest}>{rest.children}</StyledButton>
);

export default Button;
