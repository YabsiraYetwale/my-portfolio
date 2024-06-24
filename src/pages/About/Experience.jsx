

const Experience = ({ title, icon, description1,description2 }) => {
    return (
      <li className="service-item">
        <div className="service-icon-box">
          <a href="https://ethernet.edu.et/"  target="_blank">
          <img src={icon} alt={`${title} icon`} width="60" />
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

