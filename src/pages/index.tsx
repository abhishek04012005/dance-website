import Head from 'next/head';
import { useState } from 'react';
import data from '../data/danceData.json';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import Classes from '../components/Classes';
import Gallery from '../components/Gallery';
import Team from '../components/Team';
import Schedule from '../components/Schedule';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import EnquiryModal from '../components/EnquiryModal';
import Footer from '../components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Nav />
      <Head>
        <title>{data.studio} — Dance Studio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <Hero studio={data.studio} tagline={data.tagline} />
        <About about={data.about} />
        <Classes classes={data.classes} classesSection={data.classesSection} />
        <Gallery items={data.classes} gallerySection={data.gallerySection} />
        <Team team={data.team} />
        <Schedule schedule={data.schedule} scheduleSection={data.scheduleSection} />
        <Testimonials />
        <CTA cta={data.cta} onEnquiry={() => setIsModalOpen(true)} />
      </div>
      <EnquiryModal 
        enquiry={data.enquiry} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Footer footer={data.footer} studio={data.studio} />
    </>
  );
}
