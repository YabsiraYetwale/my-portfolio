/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import Testimonial from "./Testimonial";
import Education from "./Education";
import Service from "./Service";
import Experience from "./Experience";

const servicesData = [
  {
    icon: "/images/icon-dev.svg",
    title: "Web development",
    description: "High-quality development of sites at the professional level.",
  },

  {
    icon: "/images/icon-dev.svg",
    title: " Full Stack Development",
    description:
      `⚡ Building responsive website front end using React,nextjs,angular,                               
        ⚡ Creating application backend in Node, Express & nestJs`,
  },
];
const education = [
  {
    avatar: "/images/aau.png",
    name: `AddisAbaba Institute of Information Technology 
    Bsc. in Software Engineering(Cyber Security) 2021 - `,
    description1: `⚡I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.`,
    
    description2:`⚡Apart from this, I have done courses on Cloud Computing and Full Stack Development.` 
   },
];
const experience = [
  {
  title: "Internship",
  icon:"/images/ethernet.png",
  description1: `
      As an intern at EthERNet, an Ethiopian 
      company providing high-performance connectivity 
      to universities and research institutions, I have been 
      responsible for developing end-to-end web applications 
      that deliver exceptional user experiences.`,
  description2: `My internship 
      work has involved utilizing technologies such as Next.js for 
      fast server-rendered React applications, Tailwind CSS for 
      efficient styling, and Shadcn for reusable UI components. `
},
];

const About = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    fetch("testimonials.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTestimonials(data);
      });
  }, []);
  return (
    <article className="about  active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <p>
          I am passionate full-stack developer who always strives to work on
          end-to-end products that develop sustainable and scalable social and
          technical systems to create impact. With a strong understanding of
          both front-end and back-end technologies, I am able to take projects
          from concept to completion, ensuring seamless integration and
          optimization across the entire stack. I am committed to leveraging the
          latest tools and frameworks to build high-performing, user-centric
          applications that drive meaningful change.
        </p>

        <p>
          My job is to build your website so that it is functional and
          user-friendly but at the same time attractive. Moreover, I add
          personal touch to your product and make sure that is eye-catching and
          easy to use. My aim is to bring across your message and identity in
          the most creative way.
        </p>
      </section>

      {/* <!--
      - service
    --> */}

      <section className="service">
        <h3 className="h3 service-title">What i'm doing</h3>

        <ul className="service-list">
          {servicesData.map((service, index) => (
            <Service
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </ul>
      </section>

         {/* <!--
      - education
    --> */}
      <section className="testimonials">
        <h3 className="h3 testimonials-title">Education</h3>

        <ul className="testimonials-list has-scrollbar">
          {education.map((edu, index) => (
            <Education
              key={index}
              name={edu.name}
              avatar={edu.avatar}
              description1={edu.description1}
              description2={edu.description2}
            />
          ))}
        </ul>
      </section>
     
         {/* <!--
      - experience
    --> */}
      <section className="">
        <h3 className="h3 service-title">Experience</h3>

        <ul className="">
          {experience.map((ex, index) => (
            <Experience
              key={index}
              icon={ex.icon}
              title={ex.title}
              description1={ex.description1}
              description2={ex.description2}
            />
          ))}
        </ul>
      </section>
    </article>
  );
};

export default About;
