
'use client'

import { Button } from "react-bootstrap";
import { z } from "zod";
import { useRouter } from "next/navigation";

const slugSchema = z
  .string()
  .regex(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/)
  .min(3);

function generateSlug() {
    return "example";
}


export default function StreamingVideoPage() {
const router = useRouter();

  return (
    <div>
    <Button variant="secondary"  onClick={() => router.push(`/admin/streaming-video/${generateSlug()}/host`)}>
        Join as host
    </Button>
    <Button variant="secondary"  onClick={() => router.push(`/admin/streaming-video/${generateSlug()}/client`)}>
        Join as client
    </Button>
    </div>


  );
}