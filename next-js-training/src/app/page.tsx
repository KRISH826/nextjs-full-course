import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import { MoveRight } from "lucide-react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="app_page">
      <h1 className="text-2xl font-medium">User Session Data: </h1>
      {session ? (
        <>
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                color="secondary"
                type="submit"
                startContent={<MoveRight color="white" />}
              >
                Log Out
              </Button>
            </form>
          </div>
        </>
      ) : (
        <p>Not Signed In</p>
      )}
    </div>
  );
}
