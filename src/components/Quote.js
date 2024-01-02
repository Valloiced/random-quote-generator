import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft, faQuoteRight, faCopy } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import '../assets/styles/Quote.css'

export default function Quote({ domColor, isLoaded, setCategory, setIsLoaded }) {

    const [ quote, setQuote ] = useState({
        quote: "",
        author: "Anonymous",
        category: ""
    });

    const [ copied, setCopied ] = useState(false);
    
    useEffect(() => {
        fetchQuote();
    }, [])

    const fetchQuote = async () => {
        setIsLoaded(false);
        const api_url = 'https://api.api-ninjas.com/v1/quotes'

        try {
            const newQuote = await axios({
                method: 'get',
                url: api_url,
                headers: {
                    'X-Api-Key': 'BWBmyHWGujmvuAodckaayg==S2zSX1KL2QsilF98'
                  }
            })
            
            setQuote(newQuote.data[0])
            setCategory(newQuote.data[0].category)
        } catch(e) {
            console.error("Error:", e)
        } 
    }
    
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(quote.quote);

        setCopied(true)

        setTimeout(() => setCopied(false), 3000);
      } catch(e) {
        console.error("Error: ", e);
      }
    }

    const quotColor = {
        color: domColor
    }

    const clickableColor = {
        border: `1px solid ${domColor}`,
        boxShadow: `0px 0px 5px ${domColor}`
    }

    const quoteBoxColor = {
        boxShadow: `0px 0px 5px ${domColor}`
    }

    const copyToClipboardColor = {
      backgroundColor: domColor,
      opacity: copied ? '1': '0'
    }

    return !isLoaded ? (
        <Loading />
      ) : (
        <div id="quote-box" style={quoteBoxColor}>
          <h3 id="text">
            <FontAwesomeIcon icon={faQuoteLeft} size="xl" className="icon quot" style={quotColor} />
            {quote.quote}
            <FontAwesomeIcon icon={faQuoteRight} size="xl" className="icon quot" style={quotColor} />
          </h3>
          <h4 id="author">- {quote.author}</h4>
          <div id="line-h" />
          <div id="navbar">
            {/* Links below doesn't work yet */}
            <div id="links">
              <div className="link" style={clickableColor}>
                <FontAwesomeIcon icon={faTwitter} className="icon" />
              </div>
              <div className="link" style={clickableColor}>
                <FontAwesomeIcon icon={faTumblr} className="icon" />
              </div>
              <div className="link" style={clickableColor} onClick={copyToClipboard}>
                <FontAwesomeIcon icon={faCopy} className="icon" />
              </div>
            </div>
            <button id="new-quote" onClick={fetchQuote} style={clickableColor}>
              New Quote
            </button>
          </div>
          <div id="copy-text" style={copyToClipboardColor}>Copied to Clipboard</div> 
        </div>
      );
}