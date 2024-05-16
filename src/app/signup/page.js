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
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGithub } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);
  if (user) {
    router.push("/home?mode=embed&controls=true");
  }
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

    const handleGithubSignin = async () => {
      setLoading(true);
      try {
        const res = await signInWithGithub();
        console.log(res)
        if (res.user) {
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

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (email != "" && password != "") {
        const res = await createUserWithEmailAndPassword(email, password);
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        alert("Fill all fields");  
      }
    } catch (e) {
      alert("Error signing up");
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
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" onClick={handleSignup} className="w-full">
              Create an account
            </Button>
            <Button variant="outline" onClick={handleGithubSignin} className="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
