"use client";

import React from "react";

// Types
import type { Tenant } from "@/types/tenant";

// Components
import ConnectSignup from "./connectSignup";
import ConnectPlan from "./connectPlan";
import ConnectBilling from "./connectBilling";

// Stepper
import { defineStepper } from "@stepperize/react";
import { type StepStatus, useStepItemContext } from "@stepperize/react/primitives";

// UI
import { Button } from "@/components/ui/button";

export function Registration() {
	const [tenant, setTenant] = React.useState<Tenant>({
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

	const updateTenant = React.useCallback(
		<K extends keyof Tenant>(key: K, value: Tenant[K]) => {
			setTenant(prev => ({ ...prev, [key]: value}))
		}, []
	);

    const { Stepper } = defineStepper(
		{
			id: "step-1",
			title: "Signup",
			description: "Connect Platform Signup",
		},
		{
			id: "step-2",
			title: "Plan",
			description: "Your Connect Plan",
		},
		{
			id: "step-3",
			title: "Billing",
			description: "Billing Information",
		}
	);

	const StepperTriggerWrapper = () => {
		const item = useStepItemContext();
		const isInactive = item.status === "inactive";

		return (
			<Stepper.Trigger
				render={(domProps) => (
					<Button
						className="rounded-full"
						variant={isInactive ? "secondary" : "default"}
						size="icon"
						{...domProps}
					>
						<Stepper.Indicator>
						{item.index + 1}
					</Stepper.Indicator>
					</Button>
				)}
			/>
		);
	};

	const StepperTitleWrapper = ({ title }: { title: string }) => {
		return (
			<Stepper.Title
				render={(domProps) => (
					<h4 className="text-sm font-medium" {...domProps}>
						{title}
					</h4>
				)}
			/>
		);
	};

	const StepperDescriptionWrapper = ({ description }: { description?: string }) => {
		if (!description) return null;
		return (
			<Stepper.Description
				render={(domProps) => (
					<p className="text-xs text-muted-foreground" {...domProps}>
						{description}
					</p>
				)}
			/>
		);
	};

	const StepperSeparatorWithLabelOrientation = ({ status, isLast }: { status: StepStatus; isLast: boolean }) => {
		if (isLast) return null;

		return (
			<Stepper.Separator
				orientation="horizontal"
				data-status={status}
				className="absolute left-[calc(50%+30px)] right-[calc(-50%+20px)] top-5 block shrink-0 bg-muted data-[status=success]:bg-primary data-[disabled]:opacity-50 transition-all duration-300 ease-in-out h-0.5"
			/>
		);
	};

	return (
		<Stepper.Root className="w-full space-y-4" orientation="horizontal">
			{({ stepper }) => (
				<>
					<Stepper.List className="flex list-none gap-2 flex-row items-center justify-between">
						{stepper.state.all.map((stepData, index) => {
							const currentIndex = stepper.state.current.index;
							const status = index < currentIndex ? "success" : index === currentIndex ? "active" : "inactive";
							const isLast = index === stepper.state.all.length - 1;
							const data = stepData as { id: string; title: string; description?: string };
							return (
								<Stepper.Item
									key={stepData.id}
									step={stepData.id}
									className="group peer relative flex w-full flex-col items-center justify-center gap-2"
								>
									<StepperTriggerWrapper />
									<StepperSeparatorWithLabelOrientation
										status={status}
										isLast={isLast}
									/>
									<div className="flex flex-col items-center text-center gap-1">
										<StepperTitleWrapper
											title={data.title}
										/>
										<StepperDescriptionWrapper
											description={data.description}
										/>
									</div>
								</Stepper.Item>
							);
						})}
					</Stepper.List>
					{stepper.flow.switch({
						"step-1": () => <ConnectSignup tenant={tenant} updateTenant={updateTenant} />,
						"step-2": () => <ConnectPlan tenant={tenant} updateTenant={updateTenant} />,
						"step-3": () => <ConnectBilling tenant={tenant} />,
					})}
					<Stepper.Actions className="flex justify-end gap-4">
						{!stepper.state.isLast && (
							<Stepper.Prev
								render={(domProps) => (
									<Button
										type="button"
										variant="secondary"
										{...domProps}
									>
										Previous
									</Button>
								)}
							/>
						)}
						{stepper.state.isLast ? (
							<Button
								type="button"
								onClick={() => stepper.navigation.reset()}
							>
								Reset
							</Button>
						) : (
							<Stepper.Next
								render={(domProps) => (
									<Button type="button" {...domProps}>
										Next
									</Button>
								)}
							/>
						)}
					</Stepper.Actions>
				</>
			)}
		</Stepper.Root>
	);
}