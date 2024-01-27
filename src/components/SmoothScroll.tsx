"use client"
import { ReactLenis } from '@studio-freight/react-lenis'

function SmoothScroll({ children }) {

    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    )
}

export default SmoothScroll;