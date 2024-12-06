import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { reservations } from "../FakeData/CustomerService";

export default function DataTableView() {
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    spaceId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    reservationId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const statuses = ["confirmed", "pending", "canceled"];

  useEffect(() => {
    setCustomers(reservations);
    setLoading(false);
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center pl-3 pr-3">
      <div className="tableHeading text-2xl text-green-400">
        Reservation Requests
      </div>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const getSeverity = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "info";
      case "canceled":
        return "danger";
      default:
        return null;
    }
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={customers}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["name", "email", "spaceId", "reservationId"]}
        header={header}
        emptyMessage="No customers found."
      >
        <Column field="id" header="Sno." style={{ minWidth: "4rem" }} />

        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search by email"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="spaceId"
          header="Space Id"
          filter
          filterPlaceholder="Search by Space Id"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="reservationId"
          header="Reservation Id"
          filter
          filterPlaceholder="Search by Reservation Id"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="requestTime"
          header="Request Time"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="startDateAndTime"
          header="Start Date & Time"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="endDateAndTime"
          header="End Date & Time"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="status"
          header="Status"
          filter
          filterElement={statusRowFilterTemplate}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
        />
      </DataTable>
    </div>
  );
}
