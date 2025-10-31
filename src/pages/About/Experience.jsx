

const Experience = ({ title, icon, description1,description2,targetLink }) => {
    return (
      <li className="service-item flex flex-col items-center justify-center">
        <div className="">
          <a href={targetLink}  target="_blank">
          <img src={icon} alt={`${title} icon`} className="w-40 h-full object-cover"/>
          </a>
        </div>
        <div className="service-content-box">
          <h4 className="h4 service-item-title">{title}</h4>
          <p className="service-item-text">{description1}</p>
          <p className="service-item-text">{description2}</p>
        </div>
      </li>
    );
  }
  
  export default Experience;

