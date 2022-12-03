import React, {useEffect, useState} from 'react'
import { Slider } from './Slider';
import { Slider_bg } from './Slider_bg';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'


const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
   
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 10000; //ms

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current+1)
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current-1)
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        setCurrent(0);
    }, []);

    useEffect(() => {
        if(autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [current]);

    console.log(current);

        
    if(!Array.isArray(slides) || slides.length <=0) { //once it gets to the end of the length resets it back
        return null;
    }

    return ( 
        <section className='slider'> 
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            {Slider.map((slide, index) =>{
                return (
                    <div className={index === current ? 'slide active' : 'slide'} 
                    key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt="pictures" className='image'/>
                        )}
                    </div>
                )
            })}
        </section>
    )
};

export default ImageSlider;
