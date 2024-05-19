import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";

export function useUser() {
    const [user, setUser] = useState(false);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => setUser(user));
    }, []);
    return user;
}