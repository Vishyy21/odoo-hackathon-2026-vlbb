import { useState  } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Search, Download, Filter } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = 'Search...',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  const handleExport = () => {
    toast.info('Downloading CSV export...');
  };

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-odoo-muted" />
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-odoo-border rounded-md bg-odoo-surface text-odoo-text focus:outline-none focus:ring-1 focus:ring-odoo-primary"
            placeholder={searchPlaceholder}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info('Advanced filters opened')}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-md border border-odoo-border overflow-x-auto bg-odoo-surface">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-odoo-muted uppercase bg-odoo-muted-background border-b border-odoo-border sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="px-6 py-4 font-semibold whitespace-nowrap">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center gap-1 hover:text-odoo-text'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUp className="h-4 w-4 inline" />,
                            desc: <ChevronDown className="h-4 w-4 inline" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-odoo-border">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-odoo-muted-background transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-32 text-center text-odoo-muted">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-odoo-muted">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
