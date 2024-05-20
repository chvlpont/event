import { Button } from "@/components/ui/button"
import getDocument from "@/lib/getDocument"
import Link from "next/link"



export default async function DetailEventPage({ params }) {

  const event = await getDocument('events', params.id)

  return (
    <div className="bg-slate-800 px-5 py-5 rounded-2xl">
      <h1>{event?.title}</h1>
      <Button asChild>
        <Link href="/admin">Close</Link>
      </Button>
    </div>
  )
}