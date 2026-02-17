"use client";

import { useCallback, useState } from "react";

// Types
import type { Tenant } from "@/types/tenant";

// Components
import ConnectSignup from "./connectSignup";
import ConnectPlan from "./connectPlan";
import ConnectBilling from "./connectBilling";
import { Stepperize } from "../stepperize/stepperize";

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
			component: ConnectSignup, 
			props: { tenant, updateTenant, goToStep: setStep } 
		},
		{ 
			component: ConnectPlan, 
			props: { tenant, updateTenant, goToStep: setStep } 
		},
		{ 
			component: ConnectBilling, 
			props: { tenant, updateTenant, goToStep: setStep } 
		},
	];

	const stepInfo: StepInfo[] = [
		{
			label: "Signup",
			description: "Connect Platform Signup"
		},
		{
			label: "Plan",
			description: "Your Connect Plan"
		},
		{
			label: "Billing",
			description: "Billing Information"
		}
	]

	return <Stepperize step={step} steps={steps} stepInfo={stepInfo}/>;
}
