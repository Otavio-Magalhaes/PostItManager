import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeatureSection';
import CallToAction from '../components/CallToAction';
import texture from "../assets/texture.jpg"

export default function Home() {
    return (
        <div className="relative h-full bg-[#D4B99D]">
            <div
                className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: `url(${texture})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "100% 100%",
                }}
            ></div>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <CallToAction />
        </div>
    );
}
