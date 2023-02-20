//STELLE

const illuminazioneStelle = (event) => {
    const stelle = document.querySelectorAll(".votazione svg path");
    const svgClicked = event.target;
    let index = 0;
    stelle.forEach((n) => n.classList.remove("lumus"));
  
    for (let i = 0; i < stelle.length; i++) {
      const stella = stelle[i];
      stella.classList.add("lumus");
      if (stella === svgClicked) {
        index = i;
        break;
      }
    }
  };