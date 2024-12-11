"use client";

import { Region } from "@/types/region";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RegionDialog } from "./dialogs/region-dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { Chip } from "@/components/ui/chip";

interface RegionsTabProps {
  regions: Region[];
  onAdd: (data: { name: string }) => void;
  onEdit: (id: string, data: { name: string }) => void;
  onDelete: (id: string) => void;
}

export function RegionsTab({ regions, onAdd, onEdit, onDelete }: RegionsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Regions</h2>
        <RegionDialog 
          mode="add" 
          onSave={onAdd}
          trigger={
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Region
            </Button>
          }
        />
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Counties</TableHead>
              <TableHead className="font-semibold">Total Cities</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No regions found. Add your first region to get started.
                </TableCell>
              </TableRow>
            ) : (
              regions.map((region) => (
                <TableRow key={region.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{region.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {region.counties.length === 0 ? (
                        <span className="text-sm text-muted-foreground">No counties</span>
                      ) : (
                        region.counties.map((county) => (
                          <Chip key={county.id} variant="secondary" className="text-xs">
                            {county.name}
                          </Chip>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                      {region.counties.reduce((acc, county) => acc + county.cities.length, 0)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <RegionDialog
                        mode="edit"
                        initialData={{ name: region.name }}
                        onSave={(data) => onEdit(region.id, data)}
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
                        onClick={() => onDelete(region.id)}
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