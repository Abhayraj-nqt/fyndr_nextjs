import Button from '@/components/global/buttons';
import { DataTableColumnHeader } from '@/components/global/data-table/data-table-column-header';
import { DataTableRowAction } from '@/types/data-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<ReportCommentDetail> | null>
  >;
};

const getReportsColumns = ({setRowAction}: Props): ColumnDef<ReportCommentDetail>[]=> {
  return [
    {
        id: "commentId",
        accessorKey:"commentId",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Comment ID" />
        ),
        cell:({row}) => <div>{row.original.commentId}</div>
    },
    {
        id: "businessName",
        accessorKey:"businessName",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Business Name" />
        ),
        cell:({row}) => <div>{row.original.businessName}{row.original.businessEmail}</div>
    },

    {
        id: "commentEmail",
        accessorKey:"commentEmail",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Commented By" />
        ),
        cell:({row}) => <div>{row.original.commentedBy}</div>
    },
    {
        id: "rating",
        accessorKey:"rating",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Rating" />
        ),
        cell:({row}) => <div>{row.original.rating}</div>
    },
    {
        id: "date",
        accessorKey:"date",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell:({row}) => <div>{row.original.reportedDt}</div>
    },
    {
        id: "action",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Action" />
        ),
        cell:({row}) => <div>
          <Button
            onClick={() => setRowAction({ row, variant: "update" })}
            variant="primary"
          >
            View
          </Button>
        </div>
    }
  ]
}

export default getReportsColumns