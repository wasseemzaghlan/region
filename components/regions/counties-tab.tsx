"use client";

import { Region } from "@/types/region";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CountyDialog } from "./dialogs/county-dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { Chip } from "@/components/ui/chip";

interface CountiesTabProps {
  regions: Region[];
  onAdd: (data: { name: string; regionId: string }) => void;
  onEdit: (id: string, data: { name: string; regionId: string }) => void;
  onDelete: (id: string) => void;
}

export function CountiesTab({ regions, onAdd, onEdit, onDelete }: CountiesTabProps) {
  const counties = regions.flatMap((region) =>
    region.counties.map((county) => ({
      ...county,
      regionName: region.name,
    }))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Counties</h2>
        <CountyDialog 
          mode="add" 
          regions={regions} 
          onSave={onAdd}
          trigger={
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add County
            </Button>
          }
        />
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Region</TableHead>
              <TableHead className="font-semibold">Cities</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {counties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No counties found. Add your first county to get started.
                </TableCell>
              </TableRow>
            ) : (
              counties.map((county) => (
                <TableRow key={county.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{county.name}</TableCell>
                  <TableCell>
                    <Chip variant="secondary" className="text-xs">
                      {county.regionName}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {county.cities.length === 0 ? (
                        <span className="text-sm text-muted-foreground">No cities</span>
                      ) : (
                        county.cities.map((city) => (
                          <Chip key={city.id} variant="default" className="text-xs">
                            {city.name}
                          </Chip>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <CountyDialog
                        mode="edit"
                        regions={regions}
                        initialData={{
                          name: county.name,
                          regionId: county.regionId,
                        }}
                        onSave={(data) => onEdit(county.id, data)}
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
                        onClick={() => onDelete(county.id)}
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