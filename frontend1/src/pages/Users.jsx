import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { ToggleButton } from "primereact/togglebutton";
import { Dialog } from "primereact/dialog";
import { usersData } from "../FakeData/CustomerService";
import Statistic_card from "../components/Statistic_card";
import { FilterMatchMode } from "primereact/api";
import { Password } from "primereact/password";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import { FormColumn, FormLabel, FormRow } from "../components/layoutComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUser, editUser, fetchUsers } from "../services/apiService";
import { useDashboard } from "../context/DataContext";
import { notify } from "../utils/notification";

const Users = () => {
  const [users, setUsers] = useState([]); // User data
  const [showDialog, setShowDialog] = useState(false); // Edit dialog
  const [addNewUser, setAddNewUser] = useState(false); // Add dialog
  const [selectedUser, setSelectedUser] = useState(null); // Current user for editing
  const toast = React.createRef();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    lName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const { userData, getUserData } = useDashboard();
  const { control: addUserControl, handleSubmit: handleAddSubmit } = useForm({
    defaultValues: {
      fName: "",
      lName: "",
      Email: "",
      Password: "",
      Number: "",
    },
  }); // Add form
  const {
    control: editUserControl,
    handleSubmit: handleEditSubmit,
    setValue,
    getValues
  } = useForm({
    defaultValues: {
      fName: "",
      lName: "",
      Email: "",
      Number: "",
      Password: "",
      userId: null,
    },
  }); // Edit form

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setUsers(userData);
    }
  }, [userData]);

  // console.log(data);
  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      notify("success", data.message);
      getUserData();
      setAddNewUser(false);
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });
  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: (data) => {
      // console.log("User added successfully:", data);
      notify("success", data.message);
      setAddNewUser(false);
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });
  // Add user submission
  const handleAddUserSubmit = (data) => {
    console.log(data);
    addUserMutation.mutate(data);
  };

  // Edit user submission
  const handleEditUserSubmit = (data) => {
    editUserMutation.mutate(data);
  };

  // Open edit dialog
  const handleEditUser = (user) => {
    setSelectedUser(user);
    console.log("user")
    console.log(user)
    setValue("fName", user.fName);
    setValue("lName", user.lName);
    setValue("Email", user.email);
    setValue("Number", user.phone);
    setValue("userId", user._id);
    setValue("Password", ""); // Optionally pre-fill password field
    setShowDialog(true);
  };
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  return (
    <div className="user-management">
      <Toast ref={toast} />

      {/* Header Section */}
      <div className="header">
        <Statistic_card
          card_number={1}
          card_heading="Total Users"
          card_icon="pi pi-user"
          card_count={users.length}
        />
        {/* <Button
          label="Add New User"
          icon="pi pi-plus"
          onClick={() => setAddNewUser(true)}
          className="p-button-success align-self-start"
        /> */}
      </div>

      {/* Users Table */}
      <DataTable
        value={users}
        paginator
        rows={5}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["fName", "lName", "email", "phoneNumber"]}
      >
        <Column
          header="Sno."
          body={snoBodyTemplate}
          style={{ minWidth: "3rem", textAlign: "center" }}
        />{" "}
        <Column
          field="fName"
          filter
          filterPlaceholder="Search by first name"
          header="First Name"
        />
        <Column
          field="lName"
          filter
          filterPlaceholder="Search by last name"
          header="Last Name"
        />
        <Column
          field="email"
          filter
          filterPlaceholder="Search by email"
          header="Email"
        />
        <Column
          field="phone"
          filter
          filterPlaceholder="Search by number"
          header="Phone Number"
        />
        <Column
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                icon="pi pi-pencil"
                className="p-button-warning"
                onClick={() => handleEditUser(rowData)}
              />
              {/* <Button
                icon="pi pi-pause"
                className="p-button-danger"
                onClick={() => toggleUser(rowData.id)}
              /> */}
            </div>
          )}
          header="Actions"
        />
      </DataTable>

      {/* Add User Dialog */}
      <Dialog
        header="Add New User"
        visible={addNewUser}
        onHide={() => setAddNewUser(false)}
      >
        <form onSubmit={handleAddSubmit(handleAddUserSubmit)}>
          <FormRow>
            <FormColumn>
              <FormLabel>First Name</FormLabel>
              <TextInput control={addUserControl} ID="fName" required />
            </FormColumn>
            <FormColumn>
              <FormLabel>Last Name</FormLabel>
              <TextInput control={addUserControl} ID="lName" required />
            </FormColumn>
            <FormColumn>
              <FormLabel>Email</FormLabel>
              <TextInput
                control={addUserControl}
                ID="Email"
                type="email"
                required
              />
            </FormColumn>
            <FormColumn>
              <FormLabel>Password</FormLabel>
              <TextInput
                control={addUserControl}
                ID="Password"
                type="password"
                required
              />
            </FormColumn>
            <FormColumn>
              <FormLabel>Number</FormLabel>
              <TextInput
                control={addUserControl}
                ID="Number"
                type="number"
                required
              />
            </FormColumn>
          </FormRow>
          <Button type="submit" label="Save" />
        </form>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        header="Edit User"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
      >
        <form onSubmit={handleEditSubmit(handleEditUserSubmit)}>
          <FormRow>
            <FormColumn>
              <FormLabel>First Name</FormLabel>
              <TextInput control={editUserControl} ID="fName" required />
            </FormColumn>
            <FormColumn>
              <FormLabel>Last Name</FormLabel>
              <TextInput control={editUserControl} ID="lName" required />
            </FormColumn>
            <FormColumn>
              <FormLabel>Email</FormLabel>
              <TextInput
                control={editUserControl}
                ID="Email"
                type="email"
                required
              />
            </FormColumn>
            <FormColumn>
              <FormLabel>Password</FormLabel>
              <TextInput
                control={editUserControl}
                ID="Password"
                type="password"
                placeHolder="leave it empty if you do not want to chnage password"
              />
            </FormColumn>
            <FormColumn>
              <FormLabel>Number</FormLabel>
              <TextInput
                control={editUserControl}
                ID="Number"
                type="number"
                required
              />
            </FormColumn>
          </FormRow>
          <Button type="submit" label="Save" />
        </form>
      </Dialog>
    </div>
  );
};

export default Users;
