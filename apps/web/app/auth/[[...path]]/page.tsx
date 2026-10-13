import { Auth } from "@workspace/ui/components/auth/auth"

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path?: string[] }>
}) {
  const { path } = await params
  const currentPath = path?.[0] ?? "sign-in"

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Auth path={currentPath} />
      </div>
    </div>
  )
}
