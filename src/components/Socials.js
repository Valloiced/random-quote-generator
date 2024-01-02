import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Socials.css"

export default function Socials({ domColor }) {
    
    const socialColors = {
        color: domColor
    }
    
    return (
        <div id="socials">
            <a href="https://github.com/Valloiced" target="_blank">
                <FontAwesomeIcon icon={ faGithub } className="social" style={socialColors} />
            </a>
            <a href="https://www.facebook.com/vince.sualog.52" target="_blank">
                <FontAwesomeIcon icon={ faFacebook } className="social" style={socialColors} />
            </a>
            <a href="https://github.com/Valloiced/random-quote-generator" target="_blank">
                <FontAwesomeIcon icon={ faCode } className="social" style={socialColors} />
            </a>
        </div>
    )
}