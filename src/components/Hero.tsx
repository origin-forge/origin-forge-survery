

import { useEffect, useState } from 'react';
import HeroMobile from './HeroMobile';
import HeroDesktop from './HeroDesktop';
import "../app/press-start-font.css";


const Hero: React.FC = () => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile ? <HeroMobile /> : <HeroDesktop />;
};

export default Hero;