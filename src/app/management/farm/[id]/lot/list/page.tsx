import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContentLayout } from "@/core/layout/content/content-layout";

export default function ListPage() {
  return (
    <ContentLayout title="Lista de Lotes">
      <Table>
        <TableCaption>Una lista de tus lotes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Propósito</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Lote A</TableCell>
            <TableCell>
              Área cercana al río, ideal para cultivos de arroz.
            </TableCell>
            <TableCell>Cultivo de arroz</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lote B</TableCell>
            <TableCell>Terreno elevado, perfecto para viñedos.</TableCell>
            <TableCell>Producción de vino</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lote C</TableCell>
            <TableCell>
              Parcela con tierra fértil, adecuada para huertas.
            </TableCell>
            <TableCell>Cultivo de vegetales</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lote D</TableCell>
            <TableCell>
              Costas arenosas, ideal para centro de recreación.
            </TableCell>
            <TableCell>Centro recreacional</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lote E</TableCell>
            <TableCell>En la montaña, bueno para apicultura.</TableCell>
            <TableCell>Producción de miel</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ContentLayout>
  );
}
