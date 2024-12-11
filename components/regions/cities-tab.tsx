"use client";

import { Region } from "@/types/region";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CityDialog } from "./dialogs/city-dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { Chip } from "@/components/ui/chip";

interface CitiesTabProps {
  regions: Region[];
  onAdd: (data: { name: string; countyId: string }) => void;
  onEdit: (id: string, data: { name: string; countyId: string }) => void;
  onDelete: (id: string) => void;
}

export function CitiesTab({ regions, onAdd, onEdit, onDelete }: CitiesTabProps) {
  const cities = regions.flatMap((region) =>
    region.counties.flatMap((county) =>
      county.cities.map((city) => ({
        ...city,
        countyName: county.name,
        regionName: region.name,
      }))
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Cities</h2>
        <CityDialog 
          mode="add" 
          regions={regions} 
          onSave={onAdd}
          trigger={
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add City
            </Button>
          }
        />
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">County</TableHead>
              <TableHead className="font-semibold">Region</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No cities found. Add your first city to get started.
                </TableCell>
              </TableRow>
            ) : (
              cities.map((city) => (
                <TableRow key={city.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>
                    <Chip variant="secondary" className="text-xs">
                      {city.countyName}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip variant="default" className="text-xs">
                      {city.regionName}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <CityDialog
                        mode="edit"
                        regions={regions}
                        initialData={{
                          name: city.name,
                          countyId: city.countyId,
                        }}
                        onSave={(data) => onEdit(city.id, data)}
                        trigger={
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-destructive"
                        onClick={() => onDelete(city.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}