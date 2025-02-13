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
import Statistic_card from "../components/Statistic_card";
import { Button } from "primereact/button";
import { useDashboard } from "../context/DataContext";
import { cencelrequest, confirmrequest, refundrequest } from "../services/apiService";
import { useMutation } from "@tanstack/react-query";
import { notify } from "../utils/notification";

export default function Reservation({ hidecard = false }) {
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    _id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "spaceId.spaceID": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    reservationID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    state: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const statuses = [
    "confirmed",
    "pending",
    "cancelled",
    "completed",
    "reserved",
    "refund"
  ];
  const { reservationData, getReservationData } = useDashboard();

  useEffect(() => {
    setCustomers(reservationData);
    setLoading(false);
  }, []);
  const confirmRequestMutation = useMutation({
    mutationFn: confirmrequest,
    onSuccess: (data) => {
      notify("success", data.message);
      getReservationData;
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });
  const confirmRequest = (id) => {
    confirmRequestMutation.mutate(id);
  };
  const cencelRequestMutation = useMutation({
    mutationFn: cencelrequest,
    onSuccess: (data) => {
      notify("success", data.message);
      getReservationData();
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });
  const refundRequestMutation = useMutation({
    mutationFn: refundrequest,
    onSuccess: (data) => {
      notify("success", data.message);
      getReservationData();
    },
    onError: (error) => {
    },
  });
  const cencelRequest = (id) => {
    cencelRequestMutation.mutate(id);
  };
  const refundRequest = (id) => {
    refundRequestMutation.mutate(id);
  };

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
    return <Tag value={rowData.state} severity={getSeverity(rowData.state)} />;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <div className="flex justify-content-center gap-2 align-items-center">
          {rowData.state === "pending" && (
            <>
              <Button
                icon="pi pi-check-circle"
                className="p-button-success "
                tooltip="confirm"
                onClick={() => confirmRequest(rowData._id)}
              />

              <Button
                icon="pi pi-ban"
                className="p-button-danger"
                tooltip="cencelled"
                onClick={() => cencelRequest(rowData._id)}
              />
            </>
          )}
          {rowData.state === "cancelled" && (
            <Button
                icon="pi pi-tag"
                className="p-button-info"
                tooltip="refund"
                onClick={() => refundRequest(rowData._id)}
              />
          )}
        </div>
      </>
    );
  };
  const getSeverity = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "info";
      case "cancelled":
        return "danger";
      case "completed":
        return "success";
      case "reserved":
        return "warning";
      case "refund":
        return "warning";
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
  const arrivalTimeTemplate = (rowData) => {
    return (
      <>
        {rowData.arrivalDate} - {rowData.arrivalTime}
      </>
    );
  };
  const leaveTimeTemplate = (rowData) => {
    return (
      <>
        {rowData.leaveDate} - {rowData.leaveTime}
      </>
    );
  };
  const requestTimeTemplate = (rowData) => {
    return <>{rowData.createdAt}</>;
  };
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  const header = renderHeader();

  return (
    <>
      <div className="reservation_page">
        {!hidecard && (
          <div className="state_card flex mb-4 ">
            <div className="w-4">
              <Statistic_card
                card_number={4}
                card_heading="Total Reservation"
                card_icon="pi pi-map"
                card_count={customers?.length}
              />
            </div>
          </div>
        )}

        <div className="card">
          <DataTable
            value={customers}
            paginator
            rows={5}
            dataKey="id"
            filters={filters}
            globalFilterFields={["name", "email", "spaceId", "reservationId"]}
            filterDisplay="row"
            loading={loading}
            header={header}
            emptyMessage="No customers found."
          >
            <Column
              header="Sno."
              body={snoBodyTemplate}
              style={{ minWidth: "3rem", textAlign: "center" }}
            />

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
              field="spaceId.spaceID"
              header="Space Id"
              body={(rowdata)=>{
                return <span>{rowdata?.spaceId?.spaceID}</span>
              }}
              filter
              filterPlaceholder="Search by Space Id"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="reservationID"
              header="Reservation Id"
              filter
              filterPlaceholder="Search by Reservation Id"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="requestTime"
              header="Request Time"
              body={requestTimeTemplate}
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="startDateAndTime"
              header="Start Date & Time"
              body={arrivalTimeTemplate}
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="endDateAndTime"
              header="End Date & Time"
              body={leaveTimeTemplate}
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="state"
              header="Status"
              filter
              filterElement={statusRowFilterTemplate}
              style={{ minWidth: "12rem" }}
              body={statusBodyTemplate}
            />
            <Column
              header="Action"
              style={{ minWidth: "12rem" }}
              body={actionBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}
