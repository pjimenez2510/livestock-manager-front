import Link from "next/link";

interface TableHeaderProps {
  idFarm?: number;
}

export const TableHeader = ({ idFarm }: TableHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Animales</h1>
        <p className="text-sm text-muted-foreground">
          Lista de todos los animales
        </p>
      </div>
      <Link
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        href={`/management/farm/${idFarm}/animal/create`}
      >
        Nuevo animal
      </Link>
    </div>
  );
};
