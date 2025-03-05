import React from 'react';
import styled from "@emotion/styled";
import BannerCarousel from "@/components/BannerCarousel";

const PageLayout = styled.div`
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;

    .content-container {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .banner-container {
        border-top: 1px solid var(--bs-border-color);
    }

    @media (min-width: 768px) {
        flex-direction: row;
        .banner-container {
            border-top: none;
            flex: 1 1 40%;
            max-width: 40%;
        }

        .content-container {
            flex: 1 1 60%;
            max-width: 60%;
        }
    }
    @media (min-width: 1200px) {
        flex-direction: row;
        .banner-container {
            flex: 1 1 33.333%;
            max-width: 33.333%;
        }

        .content-container {
            flex: 1 1 66.667%;
            max-width: 66.667%;
        }
    }

`

export default function PageContainer({children}: { children: React.ReactNode }) {
    return (
        <PageLayout>
            <div className="banner-container">
                <BannerCarousel/>
            </div>
            <div className="content-container">
                {children}
            </div>
        </PageLayout>
    )
}
