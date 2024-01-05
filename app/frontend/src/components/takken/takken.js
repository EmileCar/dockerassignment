import React, { useState } from 'react';
import LeeuwkesTak from "../../assets/img/takken/leeuwkes.jpg";
import JongKnapenTak from "../../assets/img/takken/jongknapen.jpg";
import Knapen from "../../assets/img/takken/knapen.jpg";
import JongHernieuwers from "../../assets/img/takken/jonghernieuwers.jpg";
import "./takken.css";

const Takken = ({setTak}) => {
  const [selectedTak, setSelectedTak] = useState(null);

  const handleClickTak = (e) => {
    const takId = e.currentTarget.id;
    setSelectedTak(takId);
    try{
      setTak(takId);
    } catch (error) {
      console.log("setTak is not defined: deze error is verwacht op de homepagina");
    }
  };

  const renderUitleg = () => {
    if (selectedTak) {
      let leeftijd, uitleg;
      switch (selectedTak) {
        case 'Leeuwkes':
          leeftijd = 'Leeuwkes: 6 tot 9 jaar (1ste, 2de en 3e leerjaar)';
          uitleg = "De jongste leden van onze beweging noemen we de Leeuwkes. KSA betekent voor hen spelen, spelen en nog eens spelen. Ze kunnen zich op elke activiteit verwonderen over de nieuwe ervaringen die ze opdoen. Hun levendige fantasie zorgt ervoor dat ze op reis kunnen naar eender waar, met eender wie, om eender welk probleem op te lossen. Leiers zijn tijdens deze reizen hun troost en toeverlaat.";
          break;
        case 'Jongknapen':
          leeftijd = 'Jongknapen: 9 tot 11 jaar (4de en 5de leerjaar)';
          uitleg = "De Jongknapen vinden in KSA vooral actie en spanning. Ze mogen zelf al eens het initiatief nemen om de activiteiten wat op te vullen, al houdt de leiding wel steeds een oogje in het zeil. Ze zijn de waaghalzen van KSA, die graag in competitie treden met elkaar. In de jeugdbeweging mogen ze echt bij de groep te horen en nieuwe vrienden leren kennen.";
          break;
        case 'Knapen':
          leeftijd = 'Knapen: 11 tot 14 jaar (6de leerjaar, 1ste en 2de middelbaar)';
          uitleg = "De leden van 12 tot 14 jaar heten in KSA de Knapen. Ze zijn stilaan 'groot' geworden en mogen de echte wereld gaan verkennen. Ze gebruiken de vrijheid die ze genieten als pubers om op avontuur te trekken. Ook in KSA kunnen ze met vanalles gaan experimenteren. Deze groep avonturiers is al redelijk zelfstandig geworden in al wat ze doen. Aangezien Knapen volop zichzelf aan het ontdekken zijn, leidt dit geregeld eens tot kleine crisissen waar de leider als moderator nodig is. De activiteiten worden al heel wat avontuurlijker en de vriendengroep heel wat hechter.";
          break;
        case 'Jonghernieuwers':
          leeftijd = 'Jonghernieuwers: 14 tot 16 jaar (3de, 4de en 5de middelbaar)';
          uitleg = "KSA wordt voor de Jonghernieuwers een ontmoetingsplaats met vrienden. Ze zullen soms willen stilzitten om wat gezellig te babbelen, maar trekken er even graag eens samen op uit om de meest uiteenlopende stunten te beleven. De leiders zetten activiteiten op die een uitdaging vormen voor de leden en hen uitnodigen om samen te werken om hun doel te bereiken. Hierbij wordt al heel wat verantwoordelijkheid doorgespeeld naar de leden zelf en mag de groep geregeld zelf één en ander organiseren. In KSA mogen ze zichzelf zijn, los van de doordeweekse verplichtingen en verwachtingen.";
          break;
        default:
          return null;
      }

      return (
        <div className="tak__uitleg__container" style={{maxHeight: "100%"}} id='tak__uitleg'>
          <p className="tak__leeftijd">{leeftijd}</p>
          <p className="tak__uitleg">{uitleg}</p>
        </div>
      );
    }

    return null;
  };


    return (
      <>
        <div className="takken__container">
            <a href='#tak__uitleg' className="tak" id="Leeuwkes" onClick={handleClickTak}>
                <img src={LeeuwkesTak} alt="Leeuwkes KSA Oosterzele tak" />
                <span>Leeuwkes</span>
            </a>
            <a href='#tak__uitleg' className="tak" id="Jongknapen" onClick={handleClickTak}>
                <img src={JongKnapenTak} alt="Jongknapen KSA Oosterzele tak" />
                <span>Jongknapen</span>
            </a>
            <a href='#tak__uitleg' className="tak" id="Knapen" onClick={handleClickTak}>
                <img src={Knapen} alt="Knapen KSA Oosterzele tak" />
                <span>Knapen</span>
            </a>
            <a href='#tak__uitleg' className="tak" id="Jonghernieuwers" onClick={handleClickTak}>
                <img src={JongHernieuwers} alt="Jonghernieuwers KSA Oosterzele tak" />
                <span>Jonghernieuwers</span>
            </a>
        </div>
        {renderUitleg()}
      </>
    );
}

export default Takken;