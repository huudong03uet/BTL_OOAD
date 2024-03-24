import React, { MouseEvent, useState } from 'react';
import styles from '@/styles/customer/effectImage.module.css';
import Image from 'next/image';

interface ImageEffectProps {
    imageUrl: string;
}

const MAGNIFIER_SIZE = 200;
const ZOOM_LEVEL = 2.5;

const ImageEffect: React.FC<ImageEffectProps> = ({ imageUrl }) => {
    // State variables
    const [zoomable, setZoomable] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0, mouseX: 0, mouseY: 0 });

    // Event handlers
    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        let element = e.currentTarget;
        let { width, height } = element.getBoundingClientRect();
        setImageSize({ width, height });
        setZoomable(true);
        updatePosition(e);
    };

    const handleMouseLeave = () => {
        setZoomable(false);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        updatePosition(e);
    };

    const updatePosition = (e: MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY - top;
        setPosition({
            x: -x * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            y: -y * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            mouseX: x - (MAGNIFIER_SIZE / 2),
            mouseY: y - (MAGNIFIER_SIZE / 2),
        });
    };

    return (
        <div className='flex justify-center items-center'>
            <div
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                className='w-80 h-96 relative overflow-hidden'
            >
                <Image
                    className='object-cover border z-10'
                    alt=""
                    src={imageUrl}
                    width={imageSize.width}
                    height={imageSize.height}
                    unoptimized={true}
                    layout="responsive"
                />
                <div
                    style={{
                        position: 'absolute',
                        backgroundPosition: `${position.x}px ${position.y}px`,
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
                        backgroundRepeat: 'no-repeat',
                        display: zoomable ? 'block' : 'none',
                        top: `${position.mouseY + 150}px`,
                        left: `${position.mouseX}px`,
                        width: `${MAGNIFIER_SIZE}px`,
                        height: `${MAGNIFIER_SIZE}px`,
                    }}
                    className={`z-50 border-4 rounded-full pointer-events-none absolute border-gray-500`}
                />
            </div>
        </div>
    );
};

export default ImageEffect;
