import type { Step, StepInfo } from "@/types/stepperize";
import React from "react";

type StepperizeProps = {
    step: number;
    steps: Step[];
    stepInfo: StepInfo[];
};

export default function Stepperize({ 
    step, 
    steps, 
    stepInfo 
}: StepperizeProps) {
    return (
        <div className="mt-2.5">
            {/* Visual Stepper */}
            <div className="flex items-center mb-5">
                {stepInfo.map((info, index) => {
                    const isCompleted = index + 1 < step
                    const isCurrent = index + 1 === step

                    return (
                        <React.Fragment key={index}>
                            {/* Circle */}
                            <div className="text-center flex-1">
                                <div
                                    className={`text-xl w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold relative z-10
                                        ${
                                        isCurrent
                                            ? "bg-black text-white"
                                            : isCompleted
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-300 text-gray-600"
                                        }
                                    `}
                                >
                                    {/* Number in circle */}
                                    {index + 1}
                                </div>
                                <div className="mt-1.5 text-xl">{info.label}</div>
                                <div className="text-sm text-gray-500">{info.description}</div>
                            </div>

                            {/* Line between circles */}
                            {index < stepInfo.length - 1 && (
                                <div className={`flex-1 h-[2px] mt-3.5 ${index + 1 < step ? "bg-green-500" : "bg-gray-300"}`} />
                            )}
                        </React.Fragment>
                    )
                })}
            </div>

            {/* Render Steps */}
            {steps.map((s, index) => (
                <div
                key={index}
                className={step === index + 1 ? "block" : "hidden"}
                >
                {s.element}
                </div>
            ))}
        </div>
    )
}