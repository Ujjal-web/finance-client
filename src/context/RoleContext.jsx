import React, { createContext, useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!user?.email) {
                setRole(null);
                setLoading(false);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "users", user.email));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role || "user");
                } else {
                    // Create user document with default role if it doesn't exist
                    await setDoc(doc(db, "users", user.email), {
                        email: user.email,
                        displayName: user.displayName || "",
                        photoURL: user.photoURL || "",
                        role: "user",
                        createdAt: new Date().toISOString(),
                    });
                    setRole("user");
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setRole("user"); // Default to user role on error
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [user, db]);

    const isAdmin = role === "admin";
    const isUser = role === "user";

    return (
        <RoleContext.Provider value={{ role, isAdmin, isUser, loading }}>
            {children}
        </RoleContext.Provider>
    );
};
