
const Education = ({ name, avatar,description1,description2 }) => {
    return (
      <li className="testimonials-item">
        <div className="content-card" data-testimonials-item>
          <figure className="testimonials-avatar-box">
           <a href="https://www.aau.edu.et/" target="_blank"> <img src={avatar} alt={name} width="60" data-testimonials-avatar /></a>
          </figure>
          <h4 className="h4 testimonials-item-title" data-testimonials-title>{name}</h4>
          <div className="testimonials-text" data-testimonials-text>
          <p>{description1}</p>
          <p>{description2}</p>
          </div>
        </div>
      </li>
    );
  }
  
  export default Education;