

import { useEffect, useState } from 'react';
import HeroMobile from './HeroMobile';
import "../app/press-start-font.css";
import HeroDesktop from './HeroDesktop';


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