import styled from "@emotion/styled";
import {TabDetail} from "@/components/nav/types";
import React from "react";
import classNames from "classnames";

const NavTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;
    .icon {
        flex: 0 0 1rem;
        font-size: 1.25rem;
    }
    .title {
        flex: 0 0 auto;
        display: none;
        @media (min-width: 640px) {
            display: inline-block;
        }
    }
`
export type NavLinkTitleProps = {
    tab: TabDetail;
}

export default function NavLinkTitle({tab}: NavLinkTitleProps) {
    return (
        <NavTitle>
            <span className={classNames('icon', tab.icon)} aria-label={tab.title} />
            <span className="title" aria-hidden="true">{tab.title}</span>
        </NavTitle>
    )
}
