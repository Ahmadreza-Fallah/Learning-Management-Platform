import React from "react";
import { FiCheck } from "react-icons/fi";

interface Step {
  label: string;
  icon: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="add-course-item mb-4">
      <div className="wizard">
        <ul>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isDisabled = index > currentStep;

            let className = "";
            if (isCompleted) className = "progress-activated";
            else if (isActive) className = "progress-active";

            return (
              <li key={index} className={className}>
                <span className="dot-active">
                  <span className="number">{index + 1}</span>
                  <span className="tickmark">
                    <FiCheck />
                  </span>
                </span>
                <h5
                  style={{
                    color: isDisabled ? "#a0aab0" : undefined,
                    opacity: isDisabled ? 0.6 : 1,
                  }}
                >
                  {step.label}
                </h5>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Stepper;
