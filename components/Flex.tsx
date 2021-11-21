import { CSS } from '@stitches/react/types/css-util';
import { styled } from 'stitches.config';
import Box from './Box';

const StyledFlex = styled(Box, {
    display: 'flex',
    alignItems: 's'
});

const Flex = (
    props: React.PropsWithChildren<{
        css?: CSS;
        alignItems?: 'flex-start' | 'center';
        justifyContent?:
            | 'space-between'
            | 'space-around'
            | 'center'
            | 'flex-end';
        flexDirection?: 'column' | 'row';
    }>
) => {
    return (
        <StyledFlex
            css={{
                alignItems: props.alignItems ? props.alignItems : '',
                justifyContent: props.justifyContent
                    ? props.justifyContent
                    : '',
                flexDirection: props.flexDirection ? props.flexDirection : '',
                ...props.css
            }}>
            {props.children}
        </StyledFlex>
    );
};

export default Flex;
