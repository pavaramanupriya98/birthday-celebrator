import React from 'react';
import { useState } from 'react';

const IntroModal = ({ onCloseModal }) => {

    const [isActive, setIsActive] = useState(true);

    const closeModal = () => {
        onCloseModal()
        setIsActive(false)
    }
    return (
        <div className={"modal " + (isActive ? "is-active" : "")}>
            { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */ }
            <div className="modal-background" onClick={() => closeModal()} role="dialog"/>
            <div className="modal-card">
                <header className="modal-card-head">
                <button className="delete" aria-label="close" onClick={() => closeModal()}></button>
                </header>
                <section className="modal-card-body">
                    <p className="intro-modal__body-text">
                        Please share your screen with your friends and let the virtual party begin ! <br/>
                        This is a free open source project meant for celebrating birthdays during these covid times. <br/>
                    </p>
                </section>
                <footer className="modal-card-foot">
                <button className="button intro-modal__cta-btn" onClick={() => closeModal()}>Begin</button>
                </footer>
            </div>
        </div>
    )
}

export default IntroModal;
