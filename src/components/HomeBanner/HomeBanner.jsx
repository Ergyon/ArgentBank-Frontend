import IconChat from '../../../img/icon-chat.png'
import IconMoney from '../../../img/icon-money.png'
import IconSecurity from '../../../img/icon-security.png'
import FeatureCard from '../FeatureCard/FeatureCard'
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
        <FeatureCard
          icon={IconChat}
          title="You are our #1 priority"
          desc="Need to talk to a respresentative ? Your can get through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureCard
          icon={IconMoney}
          title="More savings higher rates"
          desc="The more you save with us, the higher your interest will be!"
        />
        <FeatureCard
          icon={IconSecurity}
          title="Security you can trust"
          desc="We use top of the line encryption to make sure your data and money is always safe."
        />
      </div>
    </div>
  )
}

export default HomeBanner
