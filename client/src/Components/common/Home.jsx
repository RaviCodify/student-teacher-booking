import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../home/HeroSection";
import FeaturedTeachers from "../home/FeaturedTeachers";
import Testimonials from "../home/Testimonials";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const testimonialsRef = useRef(null);

  const createScrollAnimation = (elementRef) => {
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );
  };
  useEffect(() => {
    createScrollAnimation(heroRef);
    createScrollAnimation(featuredRef);
    createScrollAnimation(testimonialsRef);
  }, []);

  return (
    <div>
      <div ref={heroRef}>
        <HeroSection />
      </div>
      <div ref={featuredRef}>
        <FeaturedTeachers />
      </div>
      <div ref={testimonialsRef}>
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
