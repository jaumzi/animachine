import React, { useState } from 'react';
import { red, blue, green } from '@material-ui/core/colors';
import { AutoRotatingCarousel, Slide, } from 'material-auto-rotating-carousel';

import { IsMobile } from 'imports/components/util/Methods';

const tutorialSteps = [
    {
        title: 'San Francisco – Oakland Bay Bridge, United States',
        img:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        title: 'Bird',
        img:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        title: 'Bali, Indonesia',
        img:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        title: 'NeONBRAND Digital Marketing, Las Vegas, United States',
        img:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        title: 'Goč, Serbia',
        img:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

export default function ModalCarousel(props) {
    const { autoplay, open, title, slides2 } = props;
    const [state, setState] = useState({
        openCarousel: open || false,
    });
    const isMobile = IsMobile();
    const { openCarousel } = state;
    const slides = tutorialSteps;
    return (
        <AutoRotatingCarousel
            interval={4000}
            autoplay={autoplay}
            mobile={isMobile}
            title={title || 'Imagens'}
            open={openCarousel}
            onClose={() => setState({ ...state, openCarousel: false })}
            onStart={() => setState({ ...state, openCarousel: false })}
            classes={{
                dots: 'AutoRotate-dots',
            }}
        >
            {slides && slides.length && slides.map((s) => {
                const slideProps = {
                    media: s.img && <img src={s.img} alt={s.title} />,
                    title: s.title,
                    subtitle: s.subtitle || '',
                };
                return (
                    <Slide
                        {...slideProps}
                        mediaBackgroundStyle={{ backgroundColor: red[400] }}
                        style={{ backgroundColor: red[600] }}
                    />
                );
            })}
        </AutoRotatingCarousel>
    );
}