import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
const img = [
  './proto1.png',
  './proto2.png',
  './proto3.png',
  './proto4.png',
  './proto5.png',
  './proto6.png',
]

let count = 0
let slideInterval

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleNext = () => {
    count = (count + 1) % img.length
    setCurrentIndex(count)
    sliderRef.current.classList.add('fade-anim')
  }
  const handlePrev = () => {
    const productLength = img.length
    count = (currentIndex + productLength - 1) % img.length
    setCurrentIndex(count)
    sliderRef.current.classList.add('fade-anim')
  }
  const sliderRef = useRef()
  const removeAnimation = () => {
    sliderRef.current.classList.remove('fade-anim')
  }
  useEffect(() => {
    sliderRef.current.addEventListener('animationend', removeAnimation)
    sliderRef.current.addEventListener('mouseenter', pauseSlider)
    sliderRef.current.addEventListener('mouseleave', startSlider)
    startSlider()
    return () => {
      pauseSlider()
    }
  }, [])

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleNext()
    }, 4000)
  }

  const pauseSlider = () => {
    clearInterval(slideInterval)
  }
  return (
   <div className="">
      <div ref={sliderRef} className="select-none relative bg-black">
      <div className="flex">
        <div className="w-full">
        <img
        src={img[currentIndex]}
        className="h-auto w-full object-cover px-36"
      />
        </div>
       </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between items-center w-full">
        <button onClick={handlePrev}>
          <AiOutlineArrowLeft size={30} className="text-white" />
        </button>
        <button onClick={handleNext}>
          <AiOutlineArrowRight size={30} className="text-white"/>
        </button>
      </div>
    </div>
   </div>
  )
}
