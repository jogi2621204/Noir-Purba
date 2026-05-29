import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ResearchFocus from '@/components/sections/ResearchFocus';
import Innovations from '@/components/sections/Innovations';
import Publications from '@/components/sections/Publications';
import Awards from '@/components/sections/Awards';
import Expeditions from '@/components/sections/Expeditions';
import GlobalFootprint from '@/components/sections/GlobalFootprint';
import Teaching from '@/components/sections/Teaching';
import Books from '@/components/sections/Books';
import Consultant from '@/components/sections/Consultant';
import Pengajuan from '@/components/sections/Pengajuan';
import Contact from '@/components/sections/Contact';

export default function HomePage()
{
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <ResearchFocus />
                <Innovations />
                <Publications />
                <Awards />
                <Expeditions />
                <GlobalFootprint />
                <Teaching />
                <Books />
                <Consultant />
                <Pengajuan />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
