import { styled } from '../stitches.config';

export const TextField = styled('input', {
    padding: '5px 10px',
    fontSize: 15,
    border: '1px solid $accent3',
    borderRadius: 3,
    color: '$accent7',
    '&:focus': {
        border: '1px solid $colors$blue3'
    },

    variants: {
        size: {
            small: {
                fontSize: 14
            },
            medium: {
                fontSize: 16
            },
            large: {
                fontSize: 18
            }
        }
    }
});
