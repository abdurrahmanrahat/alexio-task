import AboutUs from "@/src/components/AboutUs";
import Contact from "@/src/components/Contact";
import HomeBanner from "@/src/components/HomeBanner";
import Services from "@/src/components/Services";
import { AlexioContext } from "@/src/Context";
import Header from "@/src/Header";
import Nav from "@/src/Nav";
import { Fragment, useContext, useEffect, useState } from "react";

import ImageView from "@/src/components/popup/ImageView";
import VideoPopup from "@/src/components/popup/VideoPopup";
import dynamic from "next/dynamic";
const Portfolio = dynamic(() => import("@/src/components/Portfolio"), {
  ssr: false,
});

const Index = () => {
  useEffect(() => {
    document.querySelector("html").classList.add("js");
    document.querySelector("body").classList.add("dark-body");
  }, []);

  const { toggle } = useContext(AlexioContext);


  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dashboard-backend.cyclic.app/api/v1/get/user/65b3a22c01d900e96c4219ae', {
          cache: "force-cache"
        });
        const jsonData = await res.json();
        setUser(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(user);

  return (
    <Fragment>
      <VideoPopup />
      <ImageView />
      <Nav />
      <div className={`pages-stack ${toggle ? "pages-stack--open" : ""}`}>
        <HomeBanner userInfo={user?.user.about} />
        <AboutUs userInfo={user?.user.about} services={user?.user.services} />
        <Services />
        <Portfolio />
        <Contact />
      </div>
      <Header />
    </Fragment>
  );
};
export default Index;
