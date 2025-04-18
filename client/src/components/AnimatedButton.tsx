import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glowEffect?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const AnimatedButton = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  glowEffect = true,
  className,
  children,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Setup hover animations after mount
  useEffect(() => {
    if (!buttonRef.current || disabled) return;
    
    const button = buttonRef.current;
    let hoverAnimation: gsap.core.Tween;
    
    // Create hover animation
    const onMouseEnter = () => {
      if (glowEffect) {
        gsap.killTweensOf(button);
        
        // Get appropriate glow color based on variant
        let glowColor = 'rgba(10, 239, 255, 0.6)'; // default primary
        if (variant === 'secondary') glowColor = 'rgba(255, 42, 109, 0.6)';
        if (variant === 'accent') glowColor = 'rgba(255, 158, 27, 0.6)';
        
        // Create pulsing glow effect on hover
        hoverAnimation = gsap.to(button, {
          boxShadow: `0 0 15px 2px ${glowColor}`,
          scale: 1.03,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };
    
    // Reset on mouse leave
    const onMouseLeave = () => {
      if (glowEffect) {
        gsap.killTweensOf(button);
        gsap.to(button, {
          boxShadow: '0 0 0 transparent',
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };
    
    // Press effect
    const onMouseDown = () => {
      gsap.killTweensOf(button);
      gsap.to(button, {
        scale: 0.97,
        duration: 0.1,
        ease: 'power2.out'
      });
    };
    
    // Reset on mouse up
    const onMouseUp = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.5)'
      });
    };
    
    // Add event listeners
    button.addEventListener('mouseenter', onMouseEnter);
    button.addEventListener('mouseleave', onMouseLeave);
    button.addEventListener('mousedown', onMouseDown);
    button.addEventListener('mouseup', onMouseUp);
    
    // Cleanup
    return () => {
      button.removeEventListener('mouseenter', onMouseEnter);
      button.removeEventListener('mouseleave', onMouseLeave);
      button.removeEventListener('mousedown', onMouseDown);
      button.removeEventListener('mouseup', onMouseUp);
      gsap.killTweensOf(button);
    };
  }, [variant, glowEffect, disabled]);
  
  // Handle ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Create ripple effect
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${x - diameter / 2}px`;
      circle.style.top = `${y - diameter / 2}px`;
      circle.classList.add('ripple-effect');
      
      const ripple = button.getElementsByClassName('ripple-effect')[0];
      if (ripple) {
        ripple.remove();
      }
      
      button.appendChild(circle);
      
      // Remove the ripple after animation completes
      setTimeout(() => {
        if (circle && circle.parentNode === button) {
          button.removeChild(circle);
        }
      }, 600);
    }
    
    // Call the onClick handler
    if (onClick) {
      onClick(e);
    }
  };
  
  // Determine button styles based on variant and size
  const getButtonStyles = () => {
    // Base styles
    let styles = 'relative overflow-hidden font-medium rounded-md transition-all duration-200 flex items-center justify-center';
    
    // Size variations
    if (size === 'sm') styles += ' px-3 py-1.5 text-sm';
    if (size === 'md') styles += ' px-4 py-2 text-base';
    if (size === 'lg') styles += ' px-6 py-3 text-lg';
    
    // Variant styles
    if (variant === 'primary') {
      styles += ' bg-primary text-primary-foreground hover:bg-primary/90';
    } else if (variant === 'secondary') {
      styles += ' bg-secondary text-secondary-foreground hover:bg-secondary/90';
    } else if (variant === 'accent') {
      styles += ' bg-accent text-accent-foreground hover:bg-accent/90';
    } else if (variant === 'outline') {
      styles += ' bg-transparent border border-primary text-primary hover:bg-primary/10';
    }
    
    // Disabled state
    if (disabled) {
      styles += ' opacity-50 cursor-not-allowed';
    } else {
      styles += ' transform transition duration-200';
    }
    
    return styles;
  };
  
  return (
    <>
      <button
        ref={buttonRef}
        className={cn(getButtonStyles(), className)}
        onClick={handleClick}
        type={type}
        disabled={disabled}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-2 inline-flex items-center">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2 inline-flex items-center">{icon}</span>
        )}
      </button>
      
      <style jsx global>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedButton;