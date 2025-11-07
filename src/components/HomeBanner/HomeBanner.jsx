import React from 'react'
import IconChat from '../../../img/icon-chat.png'
import IconMoney from '../../../img/icon-money.png'
import IconSecurity from '../../../img/icon-security.png'
import './HomeBanner.css'

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className="banner">
        <div className="banner-desc">
          <div className="banner-titles">
            <h3>No fees.</h3>
            <h3>No mimimun deposit.</h3>
            <h3>High interest rates.</h3>
          </div>
          <div className="banner-subtitle">
            <p>
              Open a savings account with <br /> Argent Bank today!
            </p>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <img alt="Chat icon" src={IconChat} className="feature-icon"></img>
          <h3 className="feature-title">You are our #1 priority</h3>
          <p className="feature-subtitle">
            Neet to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="feature-card">
          <img alt="Chat icon" src={IconMoney} className="feature-icon"></img>
          <h3 className="feature-title">More savings higher rates</h3>
          <p className="feature-subtitle">
            The more you save with us, the higher your interest will be!
          </p>
        </div>
        <div className="feature-card">
          <img
            alt="Chat icon"
            src={IconSecurity}
            className="feature-icon"
          ></img>
          <h3 className="feature-title">Security you can trust</h3>
          <p className="feature-subtitle">
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
