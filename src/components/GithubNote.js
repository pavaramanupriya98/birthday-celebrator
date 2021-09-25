import React from 'react';
import moraspiritImage from '../img/moraspirit-logo.png';

const GithubNote = () => (
    <span className="github-text">
        Moraspirit Initiatives
        <a href="https://moraspirit.com" target="_blank" rel="noreferrer">
            <img src={moraspiritImage} alt="github link" className="github-text__icon"/>
        </a>
    </span>
)

export default GithubNote;
