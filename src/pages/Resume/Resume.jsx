import React from 'react';
import { FaBookReader, FaRegBookmark } from "react-icons/fa";
import TimelineItem from './TimelineItem';
import SkillItem from './SkillItem';

const Resume = () => {
  return (
    <section>
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <div>
        <iframe src="https://drive.google.com/file/d/13o_XpNI1oili64xc_ge9hfUpZhqVp9KQ/preview?usp=drivesdk"></iframe>
        {/* <iframe src="https://drive.google.com/file/d/1viuuLLspACBSu1yMruXeJRgHcCYtF-DP/preview?usp=drivesdk"></iframe> */}
      </div>
      
      <div className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          <SkillItem title="Frontend development" value={90} />
          <SkillItem title="Backend Development" value={90} />
          <SkillItem title="Mobile Development" value={50} />
        </ul>
      </div>
    </section>
  );
};

export default Resume;
