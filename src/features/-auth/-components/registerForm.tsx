import clsx from "clsx";
import React, { useState } from "react";

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
import { useRegisterMutation } from "@/hooks/useMutation/useRegisterMutation";
import toast from "react-hot-toast";

const colors = {
  border: "border-[#212123]",
  mainBG: "bg-[#171719]",

  mainText: "text-[#A1A1AA]",

  input: {
    inputBG: "bg-[#09090B]",
    inputBorder: "border-[#212123]",
  },

  buttons: {
    buttonBlack: "text-[#231B1B]",

    createAccount: "bg-[#E5E5E5]",
    googleSignUp: "bg-[#212121]",
  },
};

function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { mutate, isPending, error } = useRegisterMutation();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(form);
  }

  return (
    <Card {...props} className={clsx("", colors.border, colors.mainBG)}>
      <CardHeader>
        <CardTitle className="text-white">Create an account</CardTitle>
        <CardDescription className={colors.mainText}>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username" className="text-white">
                Username
              </FieldLabel>
              <Input
                className={clsx(
                  "rounded-lg",
                  colors.input.inputBG,
                  colors.input.inputBorder,
                  colors.mainText
                )}
                id="username"
                type="text"
                placeholder="John Doe"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
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
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <FieldDescription className={colors.mainText}>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  className={clsx(
                    "text-sm",
                    colors.buttons.buttonBlack,
                    colors.buttons.createAccount
                  )}
                >
                  {isPending ? "Creating..." : "Create Account"}
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  className={clsx(
                    "text-white text-sm",
                    colors.buttons.googleSignUp
                  )}
                >
                  Sign up with Google
                </Button>

                <FieldDescription
                  className={clsx("px-6 text-center", colors.mainText)}
                >
                  Already have an account?{" "}
                  <Link to="/auth/signIn">Sign In</Link>
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
