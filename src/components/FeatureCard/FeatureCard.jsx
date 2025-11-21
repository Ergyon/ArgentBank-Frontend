import './FeatureCard.css'

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="feature-card">
      <img className="feature-icon" src={icon} alt="feature-icon" />
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </div>
  )
}

export default FeatureCard
