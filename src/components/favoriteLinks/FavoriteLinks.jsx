import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import ContentBlock from './../commonComponents/ContentBlock';

const LinkList = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
`

const LinkItem = styled.a`
    padding: .3rem;
    border-radius: 0.5rem;
    transition: .2s all;

    &.mdi {
        &:before {
            font-size: 1.5rem;
            color: #ffffff;
        }
    }
    
    &:hover {
        background-color: #ff6e6a;
        transform: translateY(-0.2rem);
    } 
`

const FavoriteLinks = () => {

    return(
        <ContentBlock backgroundColor="#252745">
            <LinkList>
                <LinkItem href='https://console.firebase.google.com/project/dashboard-6ffdd/database/dashboard-6ffdd/data/' className="mdi mdi-firebase"></LinkItem>
                <LinkItem href='https://www.instagram.com/instagram/' className="mdi mdi-instagram"></LinkItem>
                <LinkItem href='https://fi.flixable.com/' className="mdi mdi-netflix"></LinkItem>
                <LinkItem href='https://viaplay.fi/urheilu/' className="mdi mdi-hockey-sticks"></LinkItem>
                <LinkItem href='https://www.unibet.com/' className="mdi mdi-account-cash-outline"></LinkItem>
                <LinkItem href='https://classic.nordnet.fi/mux/login/startFI.html?clearEndpoint=0&intent=next/' className="mdi mdi-chart-line-variant"></LinkItem>
            </LinkList>
        </ContentBlock>
    );
}

export default FavoriteLinks;