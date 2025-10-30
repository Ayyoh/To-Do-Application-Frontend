import clsx from "clsx";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";

const colors = {
  border: "border-[#212123]",
  mainBG: "bg-[#171719]",

  mainText: "text-[#A1A1AA]",

  input: {
    inputBG: "bg-[#09090B]",
    inputBorder: "border-[#212123]",
  },

  buttons: {
    createAccount: "bg-[#E5E5E5]",
    googleSignUp: "bg-[#212121]",
  }
};

function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props} className={clsx("", colors.border, colors.mainBG)}>
      <CardHeader>
        <CardTitle className="text-white">Create an account</CardTitle>
        <CardDescription className={colors.mainText}>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className="text-white">
                Full Name
              </FieldLabel>
              <Input
                className={clsx(
                  "rounded-lg",
                  colors.input.inputBG,
                  colors.input.inputBorder,
                  colors.mainText
                )}
                id="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email" className="text-white">
                Email
              </FieldLabel>
              <Input
                className={clsx(
                  "rounded-lg",
                  colors.input.inputBG,
                  colors.input.inputBorder,
                  colors.mainText
                )}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription className={colors.mainText}>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password" className="text-white">
                Password
              </FieldLabel>
              <Input
                className={clsx(
                  "rounded-lg",
                  colors.input.inputBG,
                  colors.input.inputBorder,
                  colors.mainText
                )}
                id="password"
                type="password"
                placeholder="********"
                required
              />
              <FieldDescription className={colors.mainText}>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password" className="text-white">
                Confirm Password
              </FieldLabel>
              <Input
                className={clsx(
                  "rounded-lg",
                  colors.input.inputBG,
                  colors.input.inputBorder,
                  colors.mainText
                )}
                id="confirm-password"
                type="password"
                placeholder="********"
                required
              />
              <FieldDescription className="text-white">Please confirm your password.</FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" className={clsx("text-sm", colors.buttons.createAccount)}>Create Account</Button>
                <Button variant="ghost" type="button" className={clsx("text-white text-sm", colors.buttons.googleSignUp)}>
                  Sign up with Google
                </Button>
                <FieldDescription className={clsx("px-6 text-center", colors.mainText)}>
                  Already have an account? <Link to="/auth/signIn">Sign In</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
