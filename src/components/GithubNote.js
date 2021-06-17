import React from 'react';
import githubImage from '../img/github-icon.svg';

const GithubNote = () => (
    <span className="github-text">
        Made with ❤
        <a href="https://github.com/briashta/birthday-celebrator" target="_blank" rel="noreferrer">
            <img src={githubImage} alt="github link" className="github-text__icon"/>
        </a>
    </span>
)

export default GithubNote;
