/* eslint-disable react/prop-types */
import { useRef } from 'react';
import './styles.css'
const Slider = ({ children }) => {
    const sliderContentRef = useRef(null);
    const startX = useRef(null);
    const scrollLeft = useRef(null);

    const onHandleClickNext = () =>{
        sliderContentRef.current.scrollLeft += sliderContentRef.current.children[0].offsetWidth;
    }
    const onHandleClickPrevious = () =>{
        sliderContentRef.current.scrollLeft -= sliderContentRef.current.children[0].offsetWidth;
    }


const onMouseDown = (event) =>{}

const onMouseLeave = (event) =>{}

const onMouseUp = (event) =>{}

const onMouseMove = (event) =>{}

const onTouchStart = (event) =>{}

const onTouchEnd = (event) =>{}

const onTouchMove = (event) =>{
    event.preventDefault();
    const x = event.touches[0].clientX - sliderContentRef.current.offsetLeft;
    const walk = (x - startX.current) * 3;
    sliderContentRef.current.scrollLeft = scrollLeft.current - walk;
}


    return (
        <div className="slider">
            <button onClick={onHandleClickPrevious} type='button' className='previousButton'><span>&lt;</span></button>
            <button onClick={onHandleClickNext} type='button' className='nextButton'><span>&gt;</span></button>
            <div ref={sliderContentRef} 
            className="sliderContent"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            >
                {children}
            </div>
        </div>
    )
}

export default Slider;