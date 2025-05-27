import Button from '@/components/global/buttons';
import { DataTableColumnHeader } from '@/components/global/data-table/data-table-column-header';
import { CampaignDetail, CampaignDetailsResponse } from '@/types/api-response/adminCampaign.response';
import { DataTableRowAction } from '@/types/data-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<CampaignDetail> | null>
  >;
};
const getcampaignsTableColumns = ({setRowAction,}: Props) : ColumnDef<CampaignDetail>[] => {
  return [
    {
        id: "businessName",
        accessorKey: "buinessName",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title='Business Name' />
        ),
        cell:({row})=> <div>{row.original.businessName}</div>,
        enableSorting:false,
    },
    {
        id:"campaignName",
        accessorKey:"campaignName",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="Campaign Name" />
        ),
        cell:({row}) => <div>{row.original.campaignName}</div>,
        enableSorting:false,
    },
    {
        id:"campaignType",
        accessorKey:"campaignType",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="Campaign Type" />
        ),
        cell:({row}) => <div>{row.original.campaignType}</div>,
        enableSorting:false,
    },
    {
        id:"activeCount",
        accessorKey:"activeCount",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="Active Offers & Events" />
        ),
        cell:({row}) => {
            const active= row.original.activeOffers;
            const total = row.original.totalOffers;
            return <div>{`${active}/${total}`}</div>
        },
        enableSorting:false,
        
    },
    {
        id:"industryType",
        accessorKey:"industryType",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="Industry Type" />
        ),
        cell:({row}) => <div>{row.original.industryType}</div>,
        enableSorting:false,
    },
    {
        id:"soldCampaign",
        accessorKey:"soldCampaign",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="Sold Campaign" />
        ),
        cell:({row}) => <div>{row.original.offerSold}</div>,
        enableSorting:false,
    },
    {
        id:"amountSold",
        accessorKey:"amountSold",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="Total Amount Sold" />
        ),
        cell:({row}) => <div>{row.original.totalOfferSoldAmount}</div>,
        enableSorting:false,
    },
    {
        id:"endDate",
        accessorKey:"endDate",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="End Date" />
        ),
        cell:({row}) => <div>{row.original.endDate}</div>,
        enableHiding:false,
    },
    {
        id:"status",
        accessorKey:"status",
        header: ({column})=>(
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell:({row}) => <div>{row.original.status}</div>,
        enableSorting:false,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div>
          <Button
            onClick={() => setRowAction({ row, variant: "update" })}
            variant="primary"
          >
            Actions
          </Button>
        </div>
      ),
    },
  ]
}

export default getcampaignsTableColumns