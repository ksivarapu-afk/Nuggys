import './App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingStep1 from './assets/Onboardiing/Onboarding_St01.png'
import OnboardingStep2 from './assets/Onboardiing/Onboarding_St02.png'
import OnboardingStep3 from './assets/Onboardiing/Onboarding_St03.png'
import OnboardingStep4 from './assets/Onboardiing/Onboarding_St04.png'
import OnboardingStep5 from './assets/Onboardiing/Onboarding_St05.png'
import AILogo from './assets/AI_Logos/NUGZ.png'
import Notis from './assets/AI_Logos/Smart_Alerts.png'
import Bets from './assets/AI_Logos/Bets.png'

const onboardingSteps = [
  { 
    image: OnboardingStep1, 
    // Text customization
    title: 'NUGZ',
    logo: AILogo,
    showLogo: true,
    showTM: true,
    description: 'Our powerful AI agent instantly deliver \n the exact highlights you want.',
    contentPosition: { bottom: '140px' },
    footerPosition: { bottom: '40px' },
    titleStyle: {},
    descriptionStyle: {},
    buttonText: null,
  },
  { 
    image: OnboardingStep2, 
    title: 'Live Highlights',
    showLogo: false,
    showTM: false,
    description: 'See key plays as they happen. \n Stay locked in without missing moments.',
    contentPosition: { bottom: '140px' },
    footerPosition: { bottom: '40px' },
    titleStyle: {},
    descriptionStyle: {},
    buttonText: null,
  },
  { 
    image: OnboardingStep3, 
    logo: Notis,
    logoStyle: { width: '347.42px', height: '229.59px', top: '20%' },
    title: 'Smart Alerts',
    showLogo: true,
    showTM: false,
    description: 'Get notified only about what matters. \n Follow the game your way.',
    contentPosition: { bottom: '140px' },
    footerPosition: { bottom: '40px' },
    titleStyle: {},
    descriptionStyle: {},
    buttonText: null,
  },
  { 
    image: OnboardingStep4,
    title: 'Fantasy Sync',
    showLogo: false,
    showTM: false,
    description: 'Sync your roster for a fully tailored\n+ lineup-relevant experience.',
    contentPosition: { bottom: '140px' },
    footerPosition: { bottom: '40px' },
    titleStyle: {},
    descriptionStyle: {},
    buttonText: null,
  },
  { 
    image: OnboardingStep5, 
    logo: Bets,
    logoStyle: { width: '347.42px', height: '134px', top: '30%' },
    title: 'Weekly Pix',
    showLogo: true,
    showTM: false,
    description: 'Make fast yes or no calls on games.\n Simple decision + Real bragging rights.',
    contentPosition: { bottom: '140px' },
    footerPosition: { bottom: '40px' },
    titleStyle: {},
    descriptionStyle: {},
    buttonText: null,
  },
]

function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/personalization')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    // Clear AI highlighted clip when skipping onboarding (full reset)
    localStorage.removeItem('highlightedClipId');
    navigate('/home')
  }

  const currentStepData = onboardingSteps[currentStep - 1]
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="onboarding-container" style={{ overflow: "hidden", height: "100vh" }}>
        <div
          className="onboarding-background"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) -8.22%, #000 72.24%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 68.02%, #000 107.34%), url(${currentStepData.image})`,
          }}
        />
        <button onClick={handleSkip} className='skip-button'>Skip</button>
        {currentStepData.showLogo && currentStepData.logo && (
          <img
            src={currentStepData.logo}
            alt="NUGZ TM"
            className="onboarding-logo"
            style={currentStepData.logoStyle || {}}
          />
        )}
        <div 
          className="onboarding-content"
          style={currentStepData.contentPosition}
        >
              <div className="onboarding-brand">
                <p className="brand-name" style={currentStepData.titleStyle}>
                  {currentStepData.title}
                </p>
                {currentStepData.showTM && <p className="brand-tm">TM</p>}
              </div>
            <p 
              className="onboarding-description"
              style={currentStepData.descriptionStyle}
            >
              {currentStepData.description}
            </p>
        </div>
        <div 
          className="onboarding-footer"
          style={currentStepData.footerPosition}
        >
            <div 
              className="progress-bar-container"
              onClick={handleBack}
              style={{ cursor: currentStep > 1 ? 'pointer' : 'default' }}
            >
              {currentStep > 1 && (
                <p style={{ fontSize: '14px', fontWeight: '400', lineHeight: '150%', letterSpacing: '0.07px', textAlign: 'left', color: '#B3B3B3', marginBottom: '10px' }}>Back</p>
              )}
              <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${progressPercentage}%`,
                      backgroundColor: currentStep === 5 ? '#5AFFE7' : undefined
                    }}
                  ></div>
              </div>
            </div>
            <button 
              type='button' 
              className='next-button' 
              onClick={handleNext}
              style={currentStep === 5 ? { backgroundColor: '#5AFFE7', color: '#111111' } : {}}
            >
              {currentStepData.buttonText || (currentStep === totalSteps ? 'Got it' : 'Next')}
            </button>
        </div>
    </div>
  )
}

export default Onboarding