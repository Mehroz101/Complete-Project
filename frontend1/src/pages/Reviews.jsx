import React, { act, useEffect, useState } from "react";
import { useDashboard } from "../context/DataContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { all } from "axios";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useMutation } from "@tanstack/react-query";
import {
  approveReview,
  isFavoriteReview,
  rejectReview,
} from "../services/apiService";
import { notify } from "../utils/notification";

const Reviews = () => {
  const { allReviewsData, getAllReviewsData } = useDashboard();
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    reviewMsg: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const getSeverity = (status) => {
    switch (status.trim()) {
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      case "pending":
        return "info";
      default:
        return null;
    }
  };

  const [statuses] = useState(["approved", "rejected", "pending"]);

  const ImgBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="Img"
          src={`http://localhost:5000/${rowData.spaceId.images[0]}`}
          style={{ width: "50px" }}
        />
      </div>
    );
  };
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };
  const verifiedBodyTemplate = (rowData) => {
    const toggleStatus = (id) => {
      // Create a new array with the updated status
      //   toggleStatusMutation.mutate(id);
    };
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
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
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };
  const rejectMutation = useMutation({
    mutationFn: rejectReview,
    onSuccess: (data) => {
      getAllReviewsData();
      notify("success", data.message);
    },
    onError: (error) => {
      console.error("Error while rejecting:", error.message);
      notify("error", error.message);
    },
  });
  const approveMutation = useMutation({
    mutationFn: approveReview,
    onSuccess: (data) => {
      getAllReviewsData();
      notify("success", data.message);
    },
    onError: (error) => {
      console.error("Error while rejecting:", error.message);
      notify("error", error.message);
    },
  });
  const favoriteMutation = useMutation({
    mutationFn: isFavoriteReview,
    onSuccess: (data) => {
      getAllReviewsData();
      notify("success", data.message);
    },
    onError: (error) => {
      console.error("Error while rejecting:", error.message);
      notify("error", error.message);
    },
  });
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          {rowData.status === "pending" && (
            <>
              <div>
                <Button
                  icon="pi pi-ban"
                  rounded
                  outlined
                  severity="danger"
                  tooltip="reject"
                  tooltipOptions={{
                    position: "left",
                  }}
                  style={{
                    padding: "1px 0px",
                    fontSize: "small",
                    width: "30px",
                    height: "2rem",
                    border: "none",
                  }}
                  onClick={() => {
                    console.log(rowData);
                    rejectMutation.mutate(rowData._id);
                  }}
                />
              </div>
              <div>
                <Button
                  icon="pi pi-check-circle"
                  rounded
                  outlined
                  tooltip="approve"
                  tooltipOptions={{
                    position: "left",
                  }}
                  style={{
                    padding: "1px 0px",
                    fontSize: "small",
                    width: "30px",
                    height: "2rem",
                    border: "none",
                  }}
                  onClick={() => {
                    console.log(rowData);
                    approveMutation.mutate(rowData._id);
                  }}
                />
              </div>
            </>
          )}
          {rowData.status === "approved" && (
            <div>
              <Button
                icon={
                  rowData.isFavorite ? "pi pi-bookmark-fill" : "pi pi-bookmark"
                }
                rounded
                outlined
                //severity="danger"
                tooltip="Mark to show"
                tooltipOptions={{
                  position: "left",
                }}
                style={{
                  padding: "1px 0px",
                  fontSize: "small",
                  width: "30px",
                  height: "2rem",
                  border: "none",
                }}
                onClick={() => {
                  console.log(rowData);
                  favoriteMutation.mutate(rowData._id);
                }}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };
  useEffect(() => {
    if (allReviewsData) {
      setReviews(allReviewsData);
      console.log(allReviewsData);
      setLoading(false);
    }
  }, [allReviewsData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="review_page">
      <h1 className="page_heading">Reviews</h1>
      <DataTable
        value={reviews}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        selectionMode="single"
        // onRowSelect={viewData}
        loading={loading}
        // header={header}
        emptyMessage="No customers found."
        rowClassName={(rowData) =>
          rowData.isFavorite ? "isFavorite_true" : "isFavorite_false"
        }
      >
        <Column
          header="Sno."
          body={snoBodyTemplate}
          style={{ minWidth: "3rem", textAlign: "center" }}
        />
        <Column
          header="Id"
          field="_id"
          style={{ minWidth: "10rem" }}
          filter
          showFilterMenu={false}
          filterPlaceholder="Filter by id" // Optional placeholder
          filterMenuStyle={{ width: "7rem" }}
        />
        <Column
          header="Space Img"
          style={{ minWidth: "8rem" }}
          body={ImgBodyTemplate}
        />
        <Column
          header="Space Name"
          filter
          showFilterMenu={false}
          filterPlaceholder="Search by name"
          style={{ minWidth: "15rem" }}
          body={(data) => data.spaceId.title}
        />
        <Column
          header="Review"
          field="reviewMsg"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          filter
          filterPlaceholder="Search by msg"
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
          field="status"
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
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default Reviews;
