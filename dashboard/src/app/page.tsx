'use client';
import { useContext, useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AnalyticChart from "@/components/Analytics/Analytics";
import { AdminContext } from "@/context/AdminContext";
import { loginFromToken } from "@/service/auth"; 
import { useRouter } from "next/navigation";
import { HOST } from "@/service/host";
import Loader from "@/components/common/Loader";

export default function Home() {
  const { admin, setAdmin } = useContext(AdminContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <NextUIProvider>
      <DefaultLayout>
        <div>
          {loading ? <Loader /> : <AnalyticChart />}
        </div>
      </DefaultLayout>
    </NextUIProvider>
  );
}
