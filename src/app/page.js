"use client";
import Link from "next/link";

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
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const router = useRouter();
  const [user] = useAuthState(auth);
  if (user) {
    router.push("/home?mode=embed&controls=true");
  }

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res && res.user) {
        setEmail("");
        setPassword("");
        router.push("/home?mode=embed&controls=true");
      } else {
        alert("Cannot login");
      }
    } catch (e) {
      alert("Cannot login");
      console.log(e);
    }
    setLoading(false);
  };

  const handleSignin = async () => {
    setLoading(true);
    try {
      if (email != "" && password != "") {
        const res = await signInWithEmailAndPassword(email, password);
        if (res && res.user) {
          setEmail("");
          setPassword("");
          router.push("/home?mode=embed&controls=true");
        } else {
          alert("Incorrect email or password");
        }
      } else {
        alert("Fill all fields");
      }
    } catch (e) {
      alert("Incorrect email or password");
      console.log(e);
    }
    setLoading(false);
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" onClick={handleSignin} className="w-full">
              Login
            </Button>
            <Button
              variant="outline"
              onClick={handleGoogleSignin}
              className="w-full"
            >
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
