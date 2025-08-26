"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";
import { useState } from "react";

const PasswordCard = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  };

  const { checks, score } = checkPasswordStrength(passwordForm.newPassword);
  const strengthPercentage = (score / 5) * 100;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Password</CardTitle>
        <CardDescription>
          Update your password and security settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              className="bg-input border-border"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              className="bg-input border-border"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
            />
          </div>

          {passwordForm.newPassword && (
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Password Strength</span>
              </div>
              <Progress value={strengthPercentage} className="h-2" />

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div
                  className={`flex items-center gap-2 ${checks.length ? "text-green-500" : "text-muted-foreground"}`}
                >
                  {checks.length ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center gap-2 ${checks.lowercase ? "text-green-500" : "text-muted-foreground"}`}
                >
                  {checks.lowercase ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  Lowercase letter
                </div>
                <div
                  className={`flex items-center gap-2 ${checks.uppercase ? "text-green-500" : "text-muted-foreground"}`}
                >
                  {checks.uppercase ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  Uppercase letter
                </div>
                <div
                  className={`flex items-center gap-2 ${checks.number ? "text-green-500" : "text-muted-foreground"}`}
                >
                  {checks.number ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  Number
                </div>
                <div
                  className={`flex items-center gap-2 ${checks.special ? "text-green-500" : "text-muted-foreground"} col-span-2`}
                >
                  {checks.special ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  Special character (!@#$%^&*)
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              className="bg-input border-border"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
        </div>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Update Password
        </Button>
      </CardContent>
    </Card>
  );
};
export default PasswordCard;
