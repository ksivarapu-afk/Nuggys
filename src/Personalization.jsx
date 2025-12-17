import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import espnFantasy from './assets/Fantasy_Apps/ESPN_Fantasy.png';
import yahooFantasy from './assets/Fantasy_Apps/YAHOO_Fantasy.png';
import sleeper from './assets/Fantasy_Apps/Sleeper.png';
import draftKings from './assets/Fantasy_Apps/Draft_Kings.png';
import FollowPlayersStep from './components/FollowPlayersStep';

const personalizationSteps = [
    {
        title: 'To personalize your experience, we\nwould like to ask you a few questions.',
        subtitle: ' ',
        options: [],
        showProgressBar: false,
        buttonText: 'Begin',
        requireSelection: false,
        progressPercentage: null,
        conditionalStep: null
    },
    {
        title: 'What do you want this app to help you with?',
        subtitle: '',
        options: [
            "Track my fantasy players",
            "Surface big plays instantly",
            "Alert me when it matters",
            "Show me the important stats",
            "All of the above"
        ],
        showProgressBar: true,
        buttonText: 'Next',
        requireSelection: true,
        progressPercentage: 15,
        conditionalStep: {
            // Map selection index to conditional step config
            0: {
                title: 'Great! We\'ll track your fantasy players and show you their key moments.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Continue',
                requireSelection: false,
                progressPercentage: 30
            },
            1: {
                title: 'Nice! We all want to see big moments as soon as they happen. We\'ve got you!',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 30
            },
            2: {
                title: 'Got it! We\'ll alert you when important moments occur.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 30
            },
            3: {
                title: 'Excellent! We\'ll highlight the stats that matter most.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 30
            },
            4: {
                title: 'Perfect! We\'ll give you the complete personalized experience.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 25
            }
        }
    },
    {
        title: 'When do you want us to notify you?',
        subtitle: 'You can edit this anytime in Settings.',
        options: [
            "Only major plays",
            "Plays from my fantasy players",
            "Plays from players/teams I follow",
            "When a big play is predicted",
            "Every key moment"
        ],
        showProgressBar: true,
        buttonText: 'Next',
        requireSelection: true,
        progressPercentage: 50,
        conditionalStep: {
            // Map selection index to conditional step config
            0: {
                title: 'We\'ll notify you only for the biggest plays and game-changing moments.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 66
            },
            1: {
                title: 'We\'ll keep you updated on every play from your fantasy players.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 66
            },
            2: {
                title: 'We\'ll alert you whenever your followed players or teams make a play.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 66
            },
            3: {
                title: 'We\'ll notify you when our AI predicts a big play is about to happen.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 66
            },
            4: {
                title: 'We\'ll keep you in the loop for every key moment across all games.',
                subtitle: '',
                options: [],
                showProgressBar: true,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: 66
            }
        }
    },
    {
        title: 'Connect your fantasy account so NUGZ can track your players.',
        subtitle: 'You can sync your account anytime later.',
        options: [
            { text: "ESPN Fantasy", image: espnFantasy },
            { text: "Yahoo Fantasy", image: yahooFantasy },
            { text: "Sleeper", image: sleeper },
            { text: "DraftKings", image: draftKings },
            "Skip for now"
        ],
        showProgressBar: true,
        buttonText: 'Next',
        requireSelection: true,
        progressPercentage: 83,
        conditionalStep: {
            0: {
                title: 'Welcome to NUGYZ:\n "Name"',
                subtitle: '',
                options: [],
                showProgressBar: false,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: null
            },
            1: {
                title: 'Welcome to NUGYZ:\n "Name"',
                subtitle: '',
                options: [],
                showProgressBar: false,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: null
            },
            2: {
                title: 'Welcome to NUGYZ:\n "Name"',
                subtitle: '',
                options: [],
                showProgressBar: false,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: null
            },
            3: {
                title: 'Welcome to NUGYZ:\n "Name"',
                subtitle: '',
                options: [],
                showProgressBar: false,
                buttonText: 'Next',
                requireSelection: false,
                progressPercentage: null
            }
        }
    },
    {
        title: 'Follow the players or teams you want to keep up with.',
        subtitle: 'You can follow or unfollow anytime.',
        options: [], // Options handled by FollowPlayersStep component
        showProgressBar: true,
        buttonText: 'Next',
        requireSelection: true,
        progressPercentage: 100,
        conditionalStep: null,
        useCustomComponent: true // Flag to indicate this step uses a custom component
    }
];

export default function Personalization() {
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName') || 'Name';
    const [currentStep, setCurrentStep] = useState(1);
    const [selections, setSelections] = useState({});
    const [isShowingConditional, setIsShowingConditional] = useState(false);
    const totalSteps = personalizationSteps.length;

    // Get the current step data - either regular step or conditional step
    const getCurrentStepData = () => {
        let stepData;
        if (isShowingConditional) {
            // We're showing a conditional step
            const previousStepIndex = currentStep - 1;
            const previousStepData = personalizationSteps[previousStepIndex];
            const previousSelection = selections[currentStep];
            
            if (previousStepData?.conditionalStep && previousSelection !== null && previousSelection !== undefined) {
                stepData = previousStepData.conditionalStep[previousSelection] || null;
            } else {
                return null;
            }
        } else {
            // Regular step
            stepData = personalizationSteps[currentStep - 1];
        }
        
        // Replace "Name" with actual firstName in title if it exists (remove quotes)
        if (stepData && stepData.title) {
            stepData = {
                ...stepData,
                title: stepData.title.replace(/"Name"/g, firstName)
            };
        }
        
        return stepData;
    };

    const currentStepData = getCurrentStepData();
    if (!currentStepData) {
        // Fallback if something goes wrong
        return null;
    }

    const currentSelection = selections[currentStep] !== undefined ? selections[currentStep] : null;
    // For the last step (FollowPlayersStep), check if it's an array or single value
    const hasSelection = currentStepData.useCustomComponent 
        ? (Array.isArray(currentSelection) ? currentSelection.length > 0 : currentSelection !== null && currentSelection !== undefined)
        : (currentSelection !== null && currentSelection !== undefined);
    const isButtonDisabled = currentStepData.requireSelection && !hasSelection;
    const progressPercentage = currentStepData.progressPercentage !== null 
        ? currentStepData.progressPercentage 
        : (currentStep / totalSteps) * 100;

    const handleOptionClick = (idx) => {
        setSelections(prev => ({
            ...prev,
            [currentStep]: idx // Can be a single value or an array (for FollowPlayersStep)
        }));
    };

    const handleNext = () => {
        if (isShowingConditional) {
            // We're on a conditional step, move to next regular step
            setIsShowingConditional(false);
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            } else {
                // Clear AI highlighted clip when navigating from personalization (full reset)
                localStorage.removeItem('highlightedClipId');
                navigate('/home');
            }
        } else {
            // We're on a regular step, check if there's a conditional step to show
            const stepData = personalizationSteps[currentStep - 1];
            const selection = selections[currentStep];
            
            if (stepData?.conditionalStep && selection !== null && selection !== undefined && stepData.conditionalStep[selection]) {
                // Show conditional step
                setIsShowingConditional(true);
            } else {
                // No conditional step, move to next regular step
                if (currentStep < totalSteps) {
                    setCurrentStep(currentStep + 1);
                } else {
                    // Clear AI highlighted clip when navigating from personalization (full reset)
                    localStorage.removeItem('highlightedClipId');
                    navigate('/home');
                }
            }
        }
    };

    const handleBack = () => {
        if (isShowingConditional) {
            // We're on a conditional step, go back to the regular step
            setIsShowingConditional(false);
        } else if (currentStep > 1) {
            // We're on a regular step, go back to previous step
            setCurrentStep(currentStep - 1);
        }
    };

    // Determine if we can go back
    const canGoBack = isShowingConditional || currentStep > 1;

    return (
        <div className="personalization-container" style={{ overflow: "hidden", height: "100vh" }}>
            <div className="personalization-background"></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', zIndex: 1 }}>
                <p className="personalization-title">{currentStepData.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < currentStepData.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}</p>
                <p className="personalization-subtitle">{currentStepData.subtitle}</p>
            </div>
            {currentStepData.useCustomComponent ? (
                <FollowPlayersStep 
                    onSelection={handleOptionClick}
                    currentSelection={currentSelection}
                />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '393px', alignItems: 'center', marginTop: '32px', position: 'relative', zIndex: 2 }}>
                    {currentStepData.options.map((option, idx) => {
                        // Support both string (text-only) and object (text + image) formats
                        const optionText = typeof option === 'string' ? option : option.text;
                        const optionImage = typeof option === 'object' && option.image ? option.image : null;
                        const hasImage = optionImage !== null;
                        
                        // Use different classes based on whether there's an image
                        const buttonClass = hasImage 
                            ? (currentSelection === idx ? "selection-button-with-image-active" : "selection-button-with-image")
                            : (currentSelection === idx ? "selection-button-active" : "selection-button");
                        
                        return (
                            <button
                                key={idx}
                                type="button"
                                className={buttonClass}
                                onClick={() => handleOptionClick(idx)}
                                style={{ position: 'relative', zIndex: 2 }}
                            >
                                {optionImage && (
                                    <img 
                                        src={optionImage} 
                                        alt={optionText}
                                        className="selection-button-image"
                                    />
                                )}
                                <span>{optionText}</span>
                            </button>
                        );
                    })}
                </div>
            )}
            <div className="onboarding-footer" style={{ bottom: '40px', position: 'absolute', zIndex: 1 }}>
                {currentStepData.showProgressBar && (
                    <div 
                        className="progress-bar-container"
                        onClick={handleBack}
                        style={{ cursor: canGoBack ? 'pointer' : 'default' }}
                    >
                        {canGoBack && (
                            <p style={{ fontSize: '14px', fontWeight: '400', lineHeight: '150%', letterSpacing: '0.07px', textAlign: 'left', color: '#B3B3B3', marginBottom: '10px' }}>Back</p>
                        )}
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${progressPercentage}%`,
                                    backgroundColor: '#5AFFE7'
                                }}
                            ></div>
                        </div>
                    </div>
                )}
                {!currentStepData.showProgressBar && <div></div>}
                <button 
                    type='button' 
                    className={`next-button${isButtonDisabled ? ' next-button-disabled' : ''}`}
                    disabled={isButtonDisabled}
                    onClick={handleNext}
                    style={{}}
                >
                    {currentStepData.buttonText}
                </button>
            </div>
        </div>
    )
}