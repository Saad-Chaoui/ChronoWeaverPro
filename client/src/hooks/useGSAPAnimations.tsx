import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
  fadeIn?: boolean;
  slideIn?: 'fromLeft' | 'fromRight' | 'fromBottom' | 'fromTop';
  staggerChildren?: boolean;
  childrenSelector?: string;
  staggerAmount?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  threshold?: number; // Percentage of element visible before animation triggers
  onComplete?: () => void;
}

/**
 * Hook for scroll-triggered GSAP animations
 */
export const useGSAPAnimations = (options: AnimationOptions = {}) => {
  const {
    fadeIn = true,
    slideIn,
    staggerChildren = false,
    childrenSelector = '> *',
    staggerAmount = 0.1,
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    threshold = 0.2, // 20% of the element needs to be visible
    onComplete
  } = options;

  const ref = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Clear any previous animations
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Initial state (before animation)
    gsap.set(element, { 
      autoAlpha: fadeIn ? 0 : 1,
      x: slideIn === 'fromLeft' ? -50 : slideIn === 'fromRight' ? 50 : 0,
      y: slideIn === 'fromTop' ? -50 : slideIn === 'fromBottom' ? 50 : 0
    });

    // Create animation timeline
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration, ease },
      onComplete
    });

    // Apply animation
    if (staggerChildren) {
      const children = element.querySelectorAll(childrenSelector);
      
      // Apply initial state to children
      gsap.set(children, {
        autoAlpha: fadeIn ? 0 : 1,
        x: slideIn === 'fromLeft' ? -30 : slideIn === 'fromRight' ? 30 : 0,
        y: slideIn === 'fromTop' ? -30 : slideIn === 'fromBottom' ? 30 : 0
      });
      
      // Animate children with stagger
      tl.to(
        children,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          stagger: staggerAmount,
          delay
        }
      );
    } else {
      // Animate the main element
      tl.to(element, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        delay
      });
    }

    // Create scroll trigger
    ScrollTrigger.create({
      trigger: element,
      start: `top ${(1 - threshold) * 100}%`, // e.g., "top 80%"
      toggleActions: 'play none none none',
      animation: tl
    });

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [
    fadeIn, 
    slideIn, 
    staggerChildren, 
    childrenSelector, 
    staggerAmount, 
    duration, 
    delay, 
    ease, 
    threshold, 
    onComplete
  ]);

  return ref;
};

/**
 * Hook for creating complex animation sequences
 */
export const useSequenceAnimation = () => {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const createTimeline = (options: gsap.TimelineVars = {}) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline(options);
    return timelineRef.current;
  };

  return { ref, createTimeline, timeline: timelineRef.current };
};

/**
 * Hook for parallax scrolling effects
 */
export const useParallaxEffect = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => {
        const scrollDistance = 
          ScrollTrigger.maxScroll(window) * speed * -1;
        return scrollDistance;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return ref;
};

export default useGSAPAnimations;