/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInventory } from "@/lib/useInventory";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, CellContext } from "@tanstack/react-table";
import React from "react";

import styles from "./so-inventory-admin-table.module.scss";
import SOInventoryDeleteButton from "../SOInventoryDeleteButton/SOInventoryDeleteButton";
import SOInventoryEditButton from "../SOInventoryEditButton/SOInventoryEditButton";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export interface InventoryItem {
	uuid?: string;
	name?: string;
	description?: string;
	quantity?: number;
	base_price?: string;
	suggested_price?: string;
	image_public_id?: string;
	image_url?: string;
	created_at?: string;
	updated_at?: string;
}

const SOInventoryAdminTable = () => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const { data, isLoading } = useInventory();

	const router = useRouter();

	const toggleInventoryModal = (props: CellContext<Record<string, string>, string>) => {
		const { uuid } = props.row.original;
		router.push(`/dashboard/inventory/${uuid}`, { scroll: false });
	};

	const columns: ColumnDef<InventoryItem, any>[] = [
		{
			accessorKey: "name",
			header: "Name",
			size: 100,
			cell: (props: CellContext<InventoryItem, string>) => {
				return (
					<p
						className={styles["so-inventory-admin-table__inventory-detail"]}
						onClick={() => toggleInventoryModal(props as any)}
					>
						{props.getValue() as string}
					</p>
				);
			},
		},
		// ...(!isMobile
		// 	? [
		// 			{
		// 				accessorKey: "description",
		// 				header: "Description",
		// 				size: 250,
		// 				cell: (props: CellContext<InventoryItem, string>) => {
		// 					return <p>{props.getValue()}</p>;
		// 				},
		// 			},
		// 	  ]
		// 	: []),
		{
			accessorKey: "quantity",
			header: "Quantity",
			size: 75,
			cell: (props: CellContext<InventoryItem, number>) => {
				return <p>{props.getValue()}</p>;
			},
		},
		...(!isMobile
			? [
					{
						accessorKey: "base_price",
						header: "Base Price",
						size: 75,
						cell: (props: CellContext<InventoryItem, number>) => {
							return <p>{props.getValue()}</p>;
						},
					},
			  ]
			: []),
		{
			accessorKey: "suggested_price",
			header: "Retail Price",
			size: 75,
			cell: (props: CellContext<InventoryItem, number>) => {
				return <p>{props.getValue()}</p>;
			},
		},
		...(!isMobile
			? [
					{
						accessorKey: "created_at",
						header: "Created",
						size: 75,
						cell: (props: CellContext<InventoryItem, number>) => {
							const date = new Date(props.getValue());
							const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
							return <p>{formattedDate}</p>;
						},
					},
			  ]
			: []),
		{
			accessorKey: "updated_at",
			header: "Updated",
			size: 75,
			cell: (props: CellContext<InventoryItem, number>) => {
				const date = new Date(props.getValue());
				const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
				return <p>{formattedDate}</p>;
			},
		},
		{
			accessorKey: "uuid",
			header: "Edit/Delete",
			size: 100,
			cell: (props: CellContext<InventoryItem, string>) => {
				return (
					<div className={styles["so-inventory-admin-table__modify"]}>
						<SOInventoryEditButton props={props} />
						<SOInventoryDeleteButton props={props} />
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data: data?.inventory || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: "onChange",
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h1>{`The Company's Inventory - Admin`}</h1>
			<table className={styles["so-inventory-table"]} style={{ minWidth: `${table.getTotalSize()}px` }}>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} style={{ width: `${header.getSize()}px` }}>
									<div className={styles["so-inventory-table__header-container"]}>
										{header.column.columnDef.header as string}

										<div
											className={styles["so-inventory-table__resizer"]}
											onMouseDown={header.getResizeHandler()}
											onTouchStart={header.getResizeHandler()}
										/>
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return (
									<td key={cell.id} style={{ width: `${cell.column.getSize()}px` }}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default SOInventoryAdminTable;
