"use client";

import { useCallback, useState } from "react";

import type { Tenant } from "@/types/tenant";
import type { Step, StepInfo } from "@/types/stepper";

import ConnectSignup from "../components/registration/connectSignup";
import ConnectPlan from "../components/registration/connectPlan";
import ConnectBilling from "../components/registration/connectBilling";
import Stepper from "../components/stepper/stepper";

export function Registration() {
	const [step, setStep] = useState<number>(1);
	const [tenant, setTenant] = useState<Tenant>({
		annualLicenseCost: 0,
		contactEmailAddress: "",
		contactFirstName: "",
		contactLastName: "",
		contactPhoneNumber: "",
		couponCode: "",
		couponDiscount: 0,
		numberOfUserLicenses: 0,
		organizationName: "",
		organizationShortName: "",
	});

	const updateTenant = useCallback(
		<K extends keyof Tenant>(key: K, value: Tenant[K]) => {
			setTenant(prev => ({ ...prev, [key]: value}))
		}, []
	);

	const steps: Step[] = [
		{ 
			element: (
				<ConnectSignup 
					tenant={tenant}
					updateTenant={updateTenant}
					setStep={setStep}
				/>
			) 
		},
		{ 
			element: (
				<ConnectPlan
					tenant={tenant}
					updateTenant={updateTenant}
					setStep={setStep}
				/>
			)
		},
		{ 
			element: (
				<ConnectBilling
					tenant={tenant}
					setStep={setStep}
				/>
			)
		},
	];

	const stepInfo: StepInfo[] = [
		{
			label: "Signup",
			description: ""
		},
		{
			label: "Plan",
			description: ""
		},
		{
			label: "Billing",
			description: ""
		}
	]

	return <Stepper step={step} steps={steps} stepInfo={stepInfo}/>;
}
