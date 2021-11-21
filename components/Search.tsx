import { useRef, useState } from 'react';
import { styled } from 'stitches.config';
import Box from './Box';
import Glass from './svgs/Glass';

const StyledSearch = styled(Box, {
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    borderRadius: 4,
    border: '1px solid $accent3'
});

const StyledInput = styled('input', {
    padding: 4,
    width: '100%',
    border: 'none',
    fontSize: 16,
    '&:focus': {
        outline: 'none'
    }
});

const Search = () => {
    const [focus, setFocus] = useState(false);

    return (
        <StyledSearch
            css={{
                outline: focus ? '1.5px solid black' : 'none',
                maxWidth: 300
            }}>
            <Glass height={20} width={20} css={{ margin: '0 4 0 4' }} />
            <StyledInput
                type="text"
                placeholder="Search.."
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </StyledSearch>
    );
};

export default Search;
