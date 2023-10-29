"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const token = typeof window !== "undefined" && localStorage.getItem("lendconnect-token");
    const [authenticated, setAuthenticated] = useState(true);
    const router = useRouter();
    useEffect(() => {
     if(token) {
        router.replace("/dashboard")
        setAuthenticated(true)
     } else {
        setAuthenticated(false)
     }
    }, [token])
    
    return (
        <div>
           {!authenticated ? children : null } 
        </div>
    );
};

export default AuthLayout;
