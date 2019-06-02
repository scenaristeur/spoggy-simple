
import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';
import "./form-from-uri.js";
import "./agents/AccueilAgent.js"
class AccueilHolacratie extends LitElement {
  constructor() {
    super();
    var accueilAgent = new AccueilAgent('accueilAgent');
    accueilAgent.send('historiqueAgent', 'Prêt!');

  }
  static get properties() {
    return {
      mood: {type: String}
    }
  }

  static get styles() {
    return css`.mood { color: green; }`;
  }

  render() {
    return html`
    <!--  Web Components are <span class="mood">${this.mood}</span>!-->
    <p>  Bonjour, cher visiteur égaré ! </p>
    <p>  Je m'appelle <span class="mood">SPOGGY</span>, je suis une WebApp hébergée quelque part sur l'internet.<br>
    Selon mon concepteur, ma <span class="mood">RAISON D'ÊTRE</span> est de :
    <ul>
    <b><li>Enregistrer numériquement les <span class="mood">TENSIONS</span> de manière sécurisée afin de pouvoir créer des
    <span class="mood">CERCLES</span> d'<span class="mood">ASSOCIES</span> pour les réduire, voir même les éliminer.</li></b>
    </ul>
    </p>
    <p>
    Un peu vague, comme <span class="mood">RAISON D'ÊTRE</span> es-tu en droit de penser...<br>
    C'est pourquoi, je me dois de te préciser ce que j'entends par le mot <span class="mood">TENSION</span>.
    Il te faut l'entendre dans le sens définit par l'<span class="mood">Holacratie</span> :
    <ul>
    <b><li>
    " Une <span class="mood">TENSION</span> est un écart entre <span class="mood">CE QUI EST</span> et
    <span class="mood">CE QUI DEVRAIT ÊTRE. "</span>
    </li></b>
    </ul>
    </p>
    <br>
    En gros, on va traiter deux types de <span class="mood">TENSIONS</span> :
    Les Problèmes qu'il faut résoudre et les Idées qui peuvent améliorer les choses.
    <br>
    <p>
    Une <span class="mood">TENSION</span> est composée au minimum d'un nom ou titre pour la reconnaître, d'un exposé de
    <span class="mood">CE QUI EST</span> et d'un exposé de <span class="mood">CE QUI DEVRAIT ÊTRE</span>.<br>
    Pas si compliqué, hein... Essaie pour voir...
    </p>

    <form-from-uri  uri="https://holacratie.solid.community/public/Schema/tension.ttl"></form-from-uri>
    ok


    <br><br>
    `;
  }
}

customElements.define('accueil-holacratie', AccueilHolacratie);
