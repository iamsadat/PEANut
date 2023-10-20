import ArrayCard from "@/components/learn/ArrayCard";

const LearnPage = async () => {
    return(
        <>
        <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Learn</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <ArrayCard />
        <ArrayCard />
        <ArrayCard />
        <ArrayCard />
        <ArrayCard />
        <ArrayCard />
      </div>
    </main>
        </>
    )
}

export default LearnPage;