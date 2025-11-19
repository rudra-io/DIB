
"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

// Define the Pixel class outside the component as it has no React dependencies
class Pixel {
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeInteger: number
  maxSize: number
  delay: number
  counter: number
  counterStep: number
  isIdle: boolean
  isReverse: boolean
  isShimmer: boolean

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.width = canvas.width
    this.height = canvas.height
    this.ctx = context
    this.x = x
    this.y = y
    this.color = color
    this.speed = this.getRandomValue(0.1, 0.9) * speed
    this.size = 0
    this.sizeStep = Math.random() * 0.4
    this.minSize = 0.5
    this.maxSizeInteger = 2
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger)
    this.delay = delay
    this.counter = 0
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size,
    )
  }

  appear() {
    this.isIdle = false

    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true
    }

    if (this.isShimmer) {
      this.shimmer()
    } else {
      this.size += this.sizeStep
    }

    this.draw()
  }

  disappear() {
    this.isShimmer = false
    this.counter = 0

    if (this.size <= 0) {
      this.isIdle = true
      return
    } else {
      this.size -= 0.1
    }

    this.draw()
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true
    } else if (this.size <= this.minSize) {
      this.isReverse = false
    }

    if (this.isReverse) {
      this.size -= this.speed
    } else {
      this.size += this.speed
    }
  }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'pixel-canvas-el': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'data-gap'?: number;
                'data-speed'?: number;
                'data-colors'?: string;
                'data-variant'?: 'default' | 'icon';
                'data-no-focus'?: string;
            };
        }
    }
}

export interface PixelCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number
  speed?: number
  colors?: string[]
  variant?: "default" | "icon"
  noFocus?: boolean
}

const PixelCanvas = React.forwardRef<HTMLElement, PixelCanvasProps>(
  ({ gap, speed, colors, variant, noFocus, style, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const parentRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let pixels: Pixel[] = [];
        let animation: number | null = null;
        const timeInterval = 1000 / 60;
        let timePrevious = performance.now();
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const getColors = () => colors || ["#f8fafc", "#f1f5f9", "#cbd5e1"];
        const getGap = () => Math.max(4, Math.min(50, gap || 5));
        const getSpeed = () => (reducedMotion ? 0 : Math.max(0, Math.min(100, speed || 35))) * 0.001;
        const getVariant = () => variant || 'default';

        const getDistanceToCenter = (x: number, y: number) => {
            const dx = x - canvas.width / 2;
            const dy = y - canvas.height / 2;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const getDistanceToBottomLeft = (x: number, y: number) => {
            const dx = x;
            const dy = canvas.height - y;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const createPixels = () => {
            pixels = [];
            for (let x = 0; x < canvas.width; x += getGap()) {
                for (let y = 0; y < canvas.height; y += getGap()) {
                    const colorList = getColors();
                    const color = colorList[Math.floor(Math.random() * colorList.length)];
                    let delay = 0;

                    if (getVariant() === "icon") {
                        delay = reducedMotion ? 0 : getDistanceToCenter(x, y);
                    } else {
                        delay = reducedMotion ? 0 : getDistanceToBottomLeft(x, y);
                    }

                    pixels.push(new Pixel(canvas, ctx, x, y, color, getSpeed(), delay));
                }
            }
        };

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const rect = parent.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            createPixels();
        };

        const handleAnimation = (name: "appear" | "disappear") => {
            if (animation) {
                cancelAnimationFrame(animation);
            }

            const animate = () => {
                animation = requestAnimationFrame(animate);
                const timeNow = performance.now();
                const timePassed = timeNow - timePrevious;

                if (timePassed < timeInterval) return;

                timePrevious = timeNow - (timePassed % timeInterval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                let allIdle = true;
                for (const pixel of pixels) {
                    pixel[name]();
                    if (!pixel.isIdle) allIdle = false;
                }

                if (allIdle && animation) {
                    cancelAnimationFrame(animation);
                    animation = null;
                }
            };
            animate();
        };

        const currentParent = canvas.parentElement;
        if (currentParent) {
            parentRef.current = currentParent;
        }
        
        handleResize();

        const ro = new ResizeObserver(handleResize);
        if (parentRef.current) {
            ro.observe(parentRef.current);
        }

        const onMouseEnter = () => handleAnimation("appear");
        const onMouseLeave = () => handleAnimation("disappear");
        const onFocus = () => handleAnimation("appear");
        const onBlur = () => handleAnimation("disappear");

        if (parentRef.current) {
            parentRef.current.addEventListener("mouseenter", onMouseEnter);
            parentRef.current.addEventListener("mouseleave", onMouseLeave);
            if (!noFocus) {
                parentRef.current.addEventListener("focus", onFocus, { capture: true });
                parentRef.current.addEventListener("blur", onBlur, { capture: true });
            }
        }

        return () => {
            ro.disconnect();
            if (parentRef.current) {
                parentRef.current.removeEventListener("mouseenter", onMouseEnter);
                parentRef.current.removeEventListener("mouseleave", onMouseLeave);
                if (!noFocus) {
                    parentRef.current.removeEventListener("focus", onFocus, { capture: true });
                    parentRef.current.removeEventListener("blur", onBlur, { capture: true });
                }
            }
            if (animation) {
                cancelAnimationFrame(animation);
            }
        };

    }, [gap, speed, colors, variant, noFocus]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                ...style,
            }}
            {...props}
        />
    )
})
PixelCanvas.displayName = "PixelCanvas"

export { PixelCanvas }

    