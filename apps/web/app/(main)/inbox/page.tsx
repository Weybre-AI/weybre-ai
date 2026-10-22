export default function Inbox() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Inbox</h1>
        <div className="h-64 rounded-xl bg-muted/50 p-6">
          <p className="text-muted-foreground">Your notifications and messages will appear here.</p>
        </div>
      </div>
    </div>
  )
}
