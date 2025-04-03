/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInventory } from "@/lib/useInventory";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, CellContext } from "@tanstack/react-table";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";

import styles from "./so-inventory-admin-table.module.scss";
import Delete from "@/assets/delete.svg";
import Edit from "@/assets/edit.svg";
import { ModalContext } from "../ModalContextProvider/ModalContextProvider";

export interface InventoryItem {
	base_price?: string;
	company_price?: string;
	description?: string;
	name?: string;
	quantity?: number;
	uuid?: string;
}

const SOInventoryAdminTable = () => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const [sort, setSort] = useState("id");
	const [order, setOrder] = useState("asc");

	const { data: inventory, isLoading } = useInventory(page, limit, sort, order);
	const { modalIsOpen, setModalIsOpen, setSelectedInventoryItem } = useContext(ModalContext);

	const toggleInventoryModal = (props: CellContext<Record<string, string>, string>) => {
		setSelectedInventoryItem(props.row?.original);
		setModalIsOpen(!modalIsOpen);
	};

	const testFunction = () => {
		setPage(1);
		setSort("id");
		setOrder("asc");
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
			accessorKey: "company_price",
			header: "Price",
			size: 75,
			cell: (props: CellContext<InventoryItem, number>) => {
				return <p>{props.getValue()}</p>;
			},
		},
		{
			accessorKey: "uuid",
			header: "Edit/Remove",
			size: 100,
			cell: () => {
				return (
					<div className={styles["so-inventory-admin-table__modify"]}>
						<Edit
							className={styles["so-inventory-admin-table__modify--edit"]}
							alt="edit"
							draggable={false}
						/>
						<Delete
							className={styles["so-inventory-admin-table__modify--delete"]}
							alt="delete"
							draggable={false}
						/>
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data: inventory?.data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: "onChange",
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div style={{ display: "none" }} onClick={testFunction}></div>
			<h1>Admin</h1>
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
