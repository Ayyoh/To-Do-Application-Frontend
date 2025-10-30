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
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Link } from "@tanstack/react-router";
import { useSignInMutation } from "@/hooks/useMutation/useSignInMutation";
import { useAuthQuery } from "@/hooks/useQuery/useAuthQuery";

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
  },
};

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate: login, isPending, isError, error } = useSignInMutation();
  const { data: user } = useAuthQuery();

  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(form);
  }

  if (user) <div>Already logged in as {user.username}</div>;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={clsx("", colors.border, colors.mainBG)}>
        <CardHeader>
          <CardTitle className="text-white">Login to your account</CardTitle>
          <CardDescription className={colors.mainText}>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
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
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white">
                    Password
                  </FieldLabel>
                  <Link
                    to="/"
                    className={clsx(
                      "ml-auto inline-block text-sm underline-offset-4 hover:underline",
                      colors.mainText
                    )}
                  >
                    Forgot your password?
                  </Link>
                </div>
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isPending}
                  className={colors.buttons.createAccount}
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  className={clsx(
                    "text-white text-sm",
                    colors.buttons.googleSignUp
                  )}
                >
                  Login with Google
                </Button>
                <FieldDescription
                  className={clsx("text-center", colors.mainText)}
                >
                  Don&apos;t have an account?{" "}
                  <Link to="/auth/register">Sign Up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
