import type { Step, StepInfo } from "@/types/stepperize";
import React from "react";

type Props = {
    step: number;
    steps: Step[];
    stepInfo: StepInfo[];
};

export default function Stepperize({ step, steps, stepInfo }: Props) {
    return (
        <div style={{ marginTop: "10px"}}>
            {/* Visual Stepper */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                {stepInfo.map((info, index) => {
                    const isCompleted = index + 1 < step;
                    const isCurrent = index + 1 === step;

                    return (
                        <React.Fragment key={index}>
                            {/* Circle */}
                            <div style={{ textAlign: "center", flex: 1 }}>
                                <div style={{
                                    width: 50,
                                    height: 50,
                                    margin: "0 auto",
                                    borderRadius: "50%",
                                    backgroundColor: isCurrent ? "#000" : isCompleted ? "#4CAF50" : "#ddd",
                                    color: isCurrent || isCompleted ? "white" : "#555",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold",
                                    zIndex: 1,
                                    position: "relative",
                                }}>
                                    {index + 1}
                                </div>
                                <div style={{ marginTop: 5, fontSize: 20 }}>{info.label}</div>
                                <div style={{ fontSize: 14, color: "#888" }}>{info.description}</div>
                            </div>

                            {/* Line between circles */}
                            {index < stepInfo.length - 1 && (
                                <div
                                    style={{
                                        height: 2,
                                        flex: 1,
                                        backgroundColor: index + 1 < step ? "#4CAF50" : "#ddd",
                                        marginTop: 15, // aligns with circle center
                                    }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Render Steps */}
            {steps.map((s, index) => (
                <div
                    key={index}
                    style={{ display: step === index + 1 ? "block" : "none" }}
                >
                    {s.element}
                </div>
            ))}
        </div>
    );
}