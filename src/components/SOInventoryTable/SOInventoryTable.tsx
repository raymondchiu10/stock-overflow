/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, CellContext } from "@tanstack/react-table";
import React from "react";

import styles from "./so-inventory-table.module.scss";
import { useMediaQuery } from "react-responsive";
import { InventoryItem } from "../SOInventoryAdminTable/SOInventoryAdminTable";
import { useRouter } from "next/navigation";
import { useInventory } from "@/lib/useInventory";

const SOInventoryTable = () => {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const { data, isLoading } = useInventory();
	const router = useRouter();

	const toggleInventoryModal = (props: any) => {
		const { uuid } = props.row.original;
		router.push(`/dashboard/inventory/${uuid}`, { scroll: false });
	};

	const columns: ColumnDef<InventoryItem, any>[] = [
		{
			accessorKey: "name",
			header: "Name",
			size: 150,
			cell: (props: CellContext<InventoryItem, string>) => {
				return (
					<p
						className={styles["so-inventory-table__inventory-detail"]}
						onClick={() => toggleInventoryModal(props)}
					>
						{props.getValue()}
					</p>
				);
			},
		},
		...(!isMobile
			? [
					{
						accessorKey: "description",
						header: "Description",
						size: 250,
						cell: (props: CellContext<InventoryItem, string>) => {
							return <p>{props.getValue()}</p>;
						},
					},
			  ]
			: []),
		{
			accessorKey: "quantity",
			header: "Quantity",
			size: 75,
			cell: (props: CellContext<InventoryItem, number>) => {
				return <p>{props.getValue()}</p>;
			},
		},
		{
			accessorKey: "suggested_price",
			header: "Price",
			size: 100,
			cell: (props: CellContext<InventoryItem, number>) => {
				return <p>{props.getValue()}</p>;
			},
		},
	];

	const table = useReactTable({
		data: data?.inventory || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: "onChange",
	});

	if (isLoading) return <p>Loading...</p>;

	return (
		<>
			<h2>{`The Company's Inventory`}</h2>
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

export default SOInventoryTable;
