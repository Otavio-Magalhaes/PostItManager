



import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from "../assets/home-image.png"

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const content = contentRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;

        if (!section || !image || !content || !title || !subtitle) return;

        // Initial states
        gsap.set(image, {
            width: '1000px',
            height: '400px',
            borderRadius: '9999px'
        });
        
        gsap.set([title, subtitle], { 
            opacity: 0,
            y: 50
        });

        // Initial text animation
        const textTl = gsap.timeline();
        textTl
            .to(title, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            })
            .to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5");

        // Floating animation for text
        gsap.to(content, {
            y: "10px",
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });

        // Create the scroll-triggered animation for image
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=100%',
                pin: true,
                scrub: 1,
            }
        });

        // Image expansion animation
        scrollTl.to(image, {
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
            objectFit: 'cover',
            ease: "power2.inOut",
            duration: 1
        });

        // Text parallax effect during scroll
        scrollTl.to(content, {
            y: "25%",
            ease: "none"
        }, 0);

        return () => {
            // Cleanup
            scrollTl.scrollTrigger && scrollTl.scrollTrigger.kill();
            scrollTl.kill();
            textTl.kill();
        };
    }, []);

    return (
        <div className="relative">
            <section
                ref={sectionRef}
                className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden"
            >
                <img
                    ref={imageRef}
                    src={heroImage}
                    alt="Magical forest scene"
                    className="object-cover z-0"
                    style={{
                        width: '300px',
                        height: '200px',
                        borderRadius: '9999px'
                    }}
                />
                <div
                    ref={contentRef}
                    className="absolute flex flex-col items-center justify-center z-10"
                >
                    <h1 
                        ref={titleRef}
                        className="text-5xl font-serif mb-7 text-[#fdf6e3] drop-shadow-lg"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                    >
                        Post It your tasks
                    </h1>
                    <p 
                        ref={subtitleRef}
                        className="text-xl font-sans max-w-3xl text-[#fdf6e3] drop-shadow-lg"
                        style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
                    >
                        Um gerenciador de tarefas inspirado nos mundos encantados do Studio Ghibli.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;