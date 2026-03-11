import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { CreateLinkDialog } from "./components/create-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();
  const links = await getLinksByUserId(userId!);

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Links</h1>
        <CreateLinkDialog />
      </div>
      {links.length === 0 ? (
        <p className="text-muted-foreground">No links yet. Create your first one!</p>
      ) : (
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-base font-mono">
                    /{link.shortCode}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4">
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 truncate text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate">{link.originalUrl}</span>
                  </a>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {link.clicks} {link.clicks === 1 ? "click" : "clicks"}
                  </span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

