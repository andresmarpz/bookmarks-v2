import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React from 'react';
import { styled } from 'stitches.config';
import Box from './Box';

const StyledLink = styled('a', {
    textDecoration: 'none',
    color: '$accent8',
    cursor: 'pointer',
    borderRadius: '6px',
    padding: '8px 12px',
    '&:hover': {
        backgroundColor: '$accent2'
    }
});

const Link = (props: { href: string; label: string }) => {
    const router = useRouter();

    return (
        <NextLink href={props.href}>
            <StyledLink>{props.label}</StyledLink>
        </NextLink>
    );
};

export default Link;
