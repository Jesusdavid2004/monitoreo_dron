import { Spinner } from "@/components/ui/Spinner";

export default function RootLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner label="Cargando aplicación..." />
    </div>
  );
}