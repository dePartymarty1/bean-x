import React, {useEffect, useState} from 'react'
import { Slider } from './Slider';
import { Slider_bg } from './Slider_bg';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'


const ImageSlider_bg = ({ slides_bg }) => {
    const [current1, setCurrent] = useState(0);
    const length = slides_bg.length;
   
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 10000; //ms

    const nextSlide = () => {
        setCurrent(current1 === length - 1 ? 0 : current1 +1)
    };

    const prevSlide = () => {
        setCurrent(current1 === 0 ? length - 1 : current1 -1)
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
    }, [current1]);

    console.log(current1);

        
    if(!Array.isArray(slides_bg) || slides_bg.length <=0) { //once it gets to the end of the length resets it back
        return null;
    }

    return ( 
        <section className='slider_bg'> 
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            {Slider_bg.map((slide_bg, index) =>{
                return (
                    <div className={index === current1 ? 'slide active_bg' : 'slide_bg'} 
                    key={index}
                    >
                        {index === current1 && (
                            <img src={slide_bg.img} alt="pictures" className='img' style={{width: "1000", height:"444px" }}/>
                        )}
                    </div>
                )
            })}
        </section>
    )
};

export default ImageSlider_bg;
