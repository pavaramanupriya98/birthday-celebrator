import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import initCanvas from '../components/canvas';
import birthdaySound from '../assets/birthday.mp3';
import IntroModal from '../components/IntroModal';
import GithubNote from '../components/GithubNote';

const IndexPage = ({ data }) => {

  const [playBgMusic, setPlayBgMusic] = useState(false);

  useEffect(() => {
      initCanvas();
  }, []);

  return (
    <Layout>
      <div>
          <canvas />
          <IntroModal onCloseModal={() => {setPlayBgMusic(true)}}/>
          {
            playBgMusic ? (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
              <audio autoPlay>
                <source src={birthdaySound} type="audio/mp3" />
              </audio>
            ) : null
          }
          
          {/* <GithubNote /> */}
      </div>
    </Layout>
  )
}

export default IndexPage
