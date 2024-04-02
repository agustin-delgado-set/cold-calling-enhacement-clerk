"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

function SuccessLoginPage() {
    const { user, isLoaded, isSignedIn } = useUser();

    const origin = localStorage.getItem("origin");
    console.log("origin", origin, user);

    useEffect(() => {
        if (window.opener && !window.opener.closed && isLoaded && user && origin) {
            const safeOrigin = new URL(decodeURIComponent(origin)).origin;

            const userDataToSend = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.emailAddresses[0].emailAddress,
                fullName: user.fullName,
                origin: safeOrigin,
            };

            window.opener.postMessage(userDataToSend, safeOrigin);
            window.close();
        }
    }, [isLoaded, origin]);

    return (
        <div>
            <h1>Success! You are now signed in.</h1>
        </div>
    );
}

export default SuccessLoginPage;
