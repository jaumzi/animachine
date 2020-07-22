import React, { useState } from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils'

import './Carousel.css';

const tutorialSteps = [
    {
        label: 'Gataa',
        imgPath:
            'https://images.pexels.com/photos/160722/cat-tiger-getiegert-feel-at-home-160722.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    },
    {
        label: 'AuAu',
        imgPath:
            'https://images.pexels.com/photos/3487734/pexels-photo-3487734.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    },
    {
        label: 'Gatinha123',
        imgPath:
            'https://images.pexels.com/photos/1107807/pexels-photo-1107807.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    },
    {
        label: 'Gatilda',
        imgPath:
            'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    },
    {
        label: 'DogaoSeuAmigao',
        imgPath:
            'https://images.pexels.com/photos/40986/dog-bulldog-white-tongue-40986.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    },
    {
        label: 'MaisGataDaQuebrada',
        imgPath:
            'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    },
    {
        label: 'Cachorrao123',
        imgPath:
            'https://images.pexels.com/photos/3487734/pexels-photo-3487734.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    }
];

export default function SwipeableTextMobileStepper(props) {
    const [state, setState] = useState({
        activeStep: 0,
    });

    let handleNext = () =>
        setState({
            ...state,
            activeStep: state.activeStep + 1,
        });

    let handleBack = () =>
        setState({
            ...state,
            activeStep: state.activeStep - 1,
        });

    let handleStepChange = activeStep =>
        setState({
            ...state,
            activeStep,
        });

    const { autoplay, fullImage = true } = props;
    const { activeStep } = state;
    const maxSteps = tutorialSteps.length;

    const AutoPlaySwipeableViews = autoPlay ? autoPlay(SwipeableViews) : SwipeableViews;
    return (
        <div className='carousel-root' >
            <AutoPlaySwipeableViews
                axis='x'
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={4000}
                autoplay={autoplay || false}
            >
                {tutorialSteps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={`carousel-img ${fullImage ? 'full-img' : 'normal-img'}`} src={step.imgPath} alt={step.label} />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>

            <div className='carousel-steppers-root' >
                <div className='carousel-title-root'>
                    <Typography color="primary" className="carousel-title-text"><strong>{tutorialSteps[activeStep].label}</strong></Typography>
                </div>
                <div className='carousel-btn' >
                    <Paper elevation={1} className="carousel-paper-btn-component">
                        <Button className="carousel-btn-component" size="small" onClick={handleBack} disabled={activeStep === 0}>
                            <KeyboardArrowLeft />
                        </Button>
                    </Paper>
                    <Paper elevation={1} className="carousel-paper-btn-component">
                        <Button className="carousel-btn-component" size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            <KeyboardArrowRight />
                        </Button>
                    </Paper>
                </div>
                <div className='carousel-steppers' >
                    <MobileStepper
                        elevation={1}
                        variant="dots"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        className="carousel-stepper-component carousel-paper-stepper-component"
                    />
                </div>
            </div>
        </div>
    );
};