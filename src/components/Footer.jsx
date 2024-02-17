import React from "react";
import SpanIcon from "./SpanIcon";

function Footer() {
  return (
    <footer>
      <div className="contactoContainer">
        <p>Contacto</p>
        <div className="phoneNumber">
          <SpanIcon iconName="call" />
          1234-1234
        </div>
        <div className="instagram">
          <i className="fa-brands fa-instagram" />
          <a href="">@ArtsDelish</a>
        </div>
      </div>
      <div className="ubicacionContainer">
        <div className="ubicacion">
          <SpanIcon iconName="pin_drop" />
          <p> Ubicacion</p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6620.866664247114!2d-79.83919535163025!3d9.35176567411028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fab6d5040b116e7%3A0x7b1e4a1c04f1d2ac!2sArtsdelish!5e0!3m2!1sen!2spa!4v1708201840286!5m2!1sen!2spa"
          width="400"
          height="300"
          title="location"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
}

export default Footer;
