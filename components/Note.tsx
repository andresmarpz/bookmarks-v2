import { styled } from 'stitches.config';
import Box from './Box';

const Note = styled(Box, {
    padding: '10px',
    borderRadius: 6,
    fontSize: 14,
    overflowWrap: 'break-word',

    variants: {
        status: {
            success: {
                border: '1px solid $colors$blue3',
                color: '$blue3'
            },
            error: {
                border: '1px solid $colors$red3',
                color: '$red3'
            }
        }
    }
});

export default Note;
