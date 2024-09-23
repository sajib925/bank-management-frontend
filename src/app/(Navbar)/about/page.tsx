import React from 'react'
import AboutHeroSection from "@/components/about/AboutHeroSection";
import Link from "next/link";
import WhyChooseStyleTwo from "@/components/about/AboutFeatures";
import AboutNewFeatures from "@/components/about/AboutNewFeatures";
import MissionVision from "@/components/about/AboutMission";
import FunFacts from "@/components/about/FanFacts";

const about = () => {
  return (
      <div className=''>
          <AboutHeroSection/>
          <WhyChooseStyleTwo/>
          <MissionVision />
          <FunFacts />
          <AboutNewFeatures/>
      </div>
  )
}

export default about