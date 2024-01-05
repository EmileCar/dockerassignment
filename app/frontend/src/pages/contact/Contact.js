import React from "react";
import { useState, useEffect } from "react";
import ContactImg from "../../assets/img/pages/contact.jpg";
import "./contact.css"

function Contact(){
    return (
        <div className="page__container">
        <section className="page__section" id="contact">
            <div className="section-title__container">
            <h2 className="section-title">Contacteer ons</h2>
            <div className="section__title--border blue"></div>
            </div>
            <div className="form__container">
                <img src={ContactImg} alt="KSA Oosterzele contact" className="round-image" width="320" height="320" />
                <div className="contact-items">
                    <p>U kan ons het best contacteren via mail of telefonisch</p>
                    <p><strong>ksaoosterzele9860@gmail.com</strong></p>
                    <p><strong>0491 36 52 60</strong> (Gilles Dujardin - bondsleider)</p>
                    <p><strong>0479 09 91 56</strong> (Robin Impe - bondsleider)</p>
                    <br />
                    <p>Voor kleren of andere accessoires te kopen:</p>
                    <a className="cursive" href="https://www.ksa.be/webshop/ksa-nationaal">KSA Nationaal Webshop</a>
                </div>
            </div>
        </section>
        </div>
    );
}

export default Contact;