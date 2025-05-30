import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { spaces } from "../FakeData/CustomerService";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import Statistic_card from "../components/Statistic_card";
import { useNavigate } from "react-router";
import ROUTES from "../utils/routes";
import { useDashboard } from "../context/DataContext";
import { updateStatus } from "../services/apiService";
import { useMutation } from "@tanstack/react-query";
import { notify } from "../utils/notification";

export default function BasicFilterDemo() {
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    spaceID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    state: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [statuses] = useState(["active", "deactivated"]);
  const { spaceData, getSpaceData } = useDashboard();

  const Navigate = useNavigate();
  const getSeverity = (status) => {
    switch (status) {
      case "active":
        return "success";

      case "deactivated":
        return "warning";

      case "renewal":
        return null;
    }
  };

  useEffect(() => {
    setCustomers(spaceData);
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
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

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="flag"
          src={`http://localhost:5000/${rowData.images[0]}`}
          className={`flag flag-${rowData.country.code}`}
          style={{ width: "50px" }}
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.state} severity={getSeverity(rowData.state)} />;
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };
  const toggleStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: (data) => {
      console.log(data);
      getSpaceData();
      notify("success", data.message);
      getReservationData();
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });

  const verifiedBodyTemplate = (rowData) => {
    const toggleStatus = (id) => {
      // Create a new array with the updated status
      toggleStatusMutation.mutate(id);
    };
    return (
      <div>
        {rowData.state === "active" ? (
          <Button
            // label="Inactive"
            icon="pi pi-times"
            className="p-button-danger"
            onClick={() => toggleStatus(rowData._id)}
          />
        ) : (
          <Button
            // label="Active"
            icon="pi pi-check"
            className="p-button-success"
            onClick={() => toggleStatus(rowData._id)}
          />
        )}
      </div>
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };
  const viewData = (e) => {
    console.log(e.data);
    Navigate(ROUTES.LISTING.LISTING_VIEW + `/${e.data.id}`);
  };
  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.averageRating} readOnly cancel={false} />;
  };
  const header = renderHeader();
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  return (
    <>
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div className="w-4">
          <Statistic_card
            card_number={4}
            card_heading="Total Spaces"
            card_icon="pi pi-map"
            card_count={customers?.length}
          />
        </div>

        {/* <Button
          label="Add New Space"
          icon="pi pi-plus"
          onClick={() => console.log("add user")}
        /> */}
      </div>
      <div className="card">
        <DataTable
          value={customers}
          paginator
          rows={10}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          selectionMode="single"
          onRowSelect={viewData}
          loading={loading}
          globalFilterFields={["title", "city", "_id", "state"]}
          header={header}
          emptyMessage="No customers found."
        >
          <Column
            header="Sno."
            body={snoBodyTemplate}
            style={{ minWidth: "3rem", textAlign: "center" }}
          />
          <Column
            header="Id"
            field="spaceID"
            style={{ minWidth: "10rem" }}
            filter
            showFilterMenu={false}
            filterPlaceholder="Filter by id" // Optional placeholder
            filterMenuStyle={{ width: "7rem" }}
          />
          <Column
            header="Space Img"
            style={{ minWidth: "8rem" }}
            body={countryBodyTemplate}
          />
          <Column
            field="title"
            header="Space Name"
            filter
            showFilterMenu={false}
            filterPlaceholder="Search by name"
            style={{ minWidth: "15rem" }}
          />
          <Column
            header="City Name"
            field="city"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            filter
            filterPlaceholder="Search by city"
          />
          <Column
            header="Completed Requests"
            field="totalBooking"
            showFilterMenu={false}
            filterMenuStyle={{ width: "5rem" }}
            style={{ minWidth: "5rem" }}
          />
          <Column
            header="Rating"
            showFilterMenu={false}
            field="CompletedRequests"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            body={ratingBodyTemplate}
          />
          <Column
            field="state"
            header="Status"
            showFilterMenu={false}
            filterMenuStyle={{ width: "7rem" }}
            style={{ minWidth: "7rem" }}
            body={statusBodyTemplate}
            filter
            filterElement={statusRowFilterTemplate}
          />
          <Column
            header="Action"
            dataType="boolean"
            style={{ minWidth: "5rem" }}
            body={verifiedBodyTemplate}
          />
        </DataTable>
      </div>
    </>
  );
}
