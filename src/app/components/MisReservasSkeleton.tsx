import { Skeleton } from "@nextui-org/react"

export default function MisReservasSkeleton() {
  const items = Array.from({ length: 5 }, (_, i) => i)

  return items.map((_, index) => (
    <section className="flex gap-4 min-h-36" key={index+'skeletonreservas'}>
      <Skeleton
        className="rounded"
      >
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <aside className="flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <Skeleton
            className="rounded"
          >
            <div className="h-4 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton
            className="rounded"
          >
            <div className="h-4 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <div className="flex flex-col gap-2">
        <Skeleton className="rounded"><div className="h-4 rounded-lg bg-default-300"></div></Skeleton>
        <Skeleton className="rounded"><div className="h-4 rounded-lg bg-default-300"></div></Skeleton>
        <Skeleton className="rounded"><div className="h-4 rounded-lg bg-default-300"></div></Skeleton>
        <Skeleton className="rounded"><div className="h-4 rounded-lg bg-default-300"></div></Skeleton>
        <Skeleton className="rounded"><div className="h-4 rounded-lg bg-default-300"></div></Skeleton>
        </div>
      </aside>
    </section>
  ))
}