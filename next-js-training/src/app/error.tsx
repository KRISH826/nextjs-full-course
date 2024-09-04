"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-115px)]">
      <Card className="w-2/5 mx-auto">
        <CardHeader className="flex-col flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-secondary">
            <TriangleAlert size={30} />
            <h2 className="text-3xl font-semibold">Error</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-center text-danger">{error.message}</div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => reset()}
            color="secondary"
            variant="bordered"
          >Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
