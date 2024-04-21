'use client'
import { useContext, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AnalyticChart from "@/components/Analytics/Analytics";
import { AdminContext } from "@/context/AdminContext";
import { loginFromToken } from "@/service/auth"; 
import { useRouter } from "next/navigation";
import { HOST } from "@/service/host";
export default function Home() {
  const { admin, setAdmin } = useContext(AdminContext);
  const router = useRouter();
  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await loginFromToken(); 
        
        if (response?.ok) {
          setAdmin(response.data);
        } else {
          console.error("Login failed:", response?.error);
          router.push(`/auth/signin`)
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    handleLogin();
  }, [setAdmin]);

  return (
    <NextUIProvider>
      <DefaultLayout>
        {admin ? (
          <AnalyticChart />
        ) : (
          <p>Loading...</p>
        )}
      </DefaultLayout>
    </NextUIProvider>
  );
}
