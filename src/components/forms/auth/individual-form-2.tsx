"use client";

import React from "react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import Button from "@/components/global/buttons";
import InputWrapper from "@/components/global/input/input-wrapper";
import ROUTES from "@/constants/routes";
import {
  useIndividualForm,
  IndividualFormData,
} from "@/hooks/auth/useIndividualForm";
import { getFormFieldsConfig } from "./form-field.config";
import FormFieldRenderer from "./form-field-renderer";

type IndividualFormProps = {
  onSubmit: (data: IndividualFormData) => void;
};

const IndividualForm2 = ({ onSubmit }: IndividualFormProps) => {
  const { form, states, setters, handlers, data } = useIndividualForm({
    onSubmit,
  });
  const fieldConfigs = getFormFieldsConfig(handlers, states, data);

  return (
    <Form {...form}>
      <form onSubmit={handlers.handleSubmit} className="space-y-6">
        {fieldConfigs.map((config) => (
          <FormFieldRenderer
            key={config.name}
            config={config}
            control={form.control}
            states={states}
            setters={setters}
            handlers={handlers}
            data={data}
          />
        ))}

        {!states.findUsOptionsLoading && data.findUsOptions.length > 0 && (
          <div className="!my-10 flex flex-row gap-4 items-center">
            <div className="w-40 min-w-40"></div>
            <InputWrapper
              label="Where did you find us?"
              className="h-fit p-4 text-[#4D4D4D]"
            >
              <RadioGroup
                value={form.watch("findUsId")?.toString() || ""}
                defaultValue="8"
                onValueChange={(value) =>
                  form.setValue("findUsId", parseInt(value))
                }
                className="flex items-center gap-6 flex-wrap p-4"
              >
                {data.findUsOptions
                  .filter((item: any) => item.active)
                  .map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={item.id.toString()}
                        id={`findus-${item.id}`}
                      />
                      <Label htmlFor={`findus-${item.id}`}>
                        {item.options}
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
            </InputWrapper>
          </div>
        )}

        <div className="flex items-center gap-4 mb-4">
          <div className="w-40 min-w-40"></div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={(checked) => setters.setAgreeOnTerms(!!checked)}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#4D4D4D]"
            >
              I agree with{" "}
              <Link href={ROUTES.LEGAL_TERMS} className="text-primary-500">
                Fyndr's terms of use
              </Link>{" "}
              &{" "}
              <Link href={ROUTES.LEGAL_privacy} className="text-primary-500">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>

        <div className="!mt-10 flex items-center gap-4 mb-4">
          <div className="w-40 min-w-40"></div>
          <Button
            type="submit"
            variant="primary"
            className="w-fit"
            stdWidth
            stdHeight
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default IndividualForm2;
