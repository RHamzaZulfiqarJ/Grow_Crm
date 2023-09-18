import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInventory } from "../../../redux/action/inventory";
import { Clear, UploadFile } from "@mui/icons-material";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { Loader, Upload } from "../../../utils";
import { deleteAllImagesReducer } from "../../../redux/reducer/upload";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { PiImages, PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../../constant";
import { Loader } from "../../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateInventory = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  let today = new Date();
  let time = today.toLocaleTimeString();
  let date = today.toLocaleDateString();
  let dateTime = date + "  " + time;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching: projectsFetching, projects } = useSelector((state) => state.project);
  const { isFetching } = useSelector((state) => state.inventory);
  const InventoryinitialState = {
    project: "",
    propertyNumber: "",
    propertyStreetNumber: "",
    price: "",
    remarks: "",
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
    sellerCompamyName: "",
    sellerCity: "",
  };

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [inventoryData, setInventoryData] = useState(InventoryinitialState);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInventory(inventoryData, navigate));
    dispatch(deleteAllImagesReducer());
    setInventoryData(InventoryinitialState);
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setInventoryData((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setInventoryData(InventoryinitialState);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Inventory</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="p-3 flex flex-col gap-2 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiUser size={23} />
              <span>Seller Details</span>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-3 text-gray-500">
              <table className="mt-4">
                <tr>
                  <td className="pb-4 text-lg">Seller Email Address </td>
                  <td className="pb-4">
                    <TextField
                      value={inventoryData.sellerEmail}
                      onChange={(e) => handleInputChange("sellerEmail", e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="Optional"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller Phone Number </td>
                  <td className="pb-4">
                    <TextField
                      value={inventoryData.sellerPhone}
                      onChange={(e) => handleInputChange("sellerPhone", e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller Name </td>
                  <td className="pb-4">
                    <TextField
                      fullWidth
                      value={inventoryData.sellerName}
                      onChange={(e) => handleInputChange("sellerName", e.target.value)}
                      size="small"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller Company Name </td>
                  <td className="pb-4">
                    <TextField
                      value={inventoryData.sellerCompamyName}
                      onChange={(e) => handleInputChange("sellerCompamyName", e.target.value)}
                      fullWidth
                      size="small"
                      type="text"
                      placeholder="Optional"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller City </td>
                  <td className="pb-4">
                    <Select
                      size="small"
                      value={inventoryData.sellerCity}
                      onChange={(e) => handleInputChange("sellerCity", e.target.value)}
                      displayEmpty
                      placeholder="Seller City"
                      fullWidth>
                      {pakistanCities.map((city) => (
                        <MenuItem value={city.toLowerCase()}>{city}</MenuItem>
                      ))}
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-primary">
              <PiNotepad size={23} />
              <span>Inventory Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Project </td>
                <td className="pb-4">
                    <Select
                      size="small"
                      value={inventoryData.project}
                      onChange={(e) => handleInputChange("project", e.target.value)}
                      displayEmpty
                      placeholder="Project"
                      fullWidth>
                      {projectsFetching ? (
                        <Loader />
                      ) : (
                        projects.map((project, index) => (
                          <MenuItem key={index} value={project._id}>
                            {project.title}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Number </td>
                <td className="pb-4">
                  <TextField
                    value={inventoryData.propertyNumber}
                    onChange={(e) => handleInputChange("propertyNumber", e.target.value)}
                    size="small"
                    placeholder="Plot/Shop/Appartment etc. No."
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Street Number </td>
                <td className="pb-4">
                  <TextField
                    value={inventoryData.propertyStreetNumber}
                    onChange={(e) => handleInputChange("propertyStreetNumber", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Price </td>
                <td className="pb-4">
                  <TextField
                    value={inventoryData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="text-lg pt-1 flex flex-col justify-start">Remarks </td>
                <td>
                  <TextField
                    value={inventoryData.remarks}
                    onChange={(e) => handleInputChange("remarks", e.target.value)}
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mr-7 mb-5">
          <button
            onClick={handleClose}
            variant="contained"
            className="bg-red-400 px-4 py-2 rounded-lg mt-4 text-white hover:bg-red-500 border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-primary transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-sky-400 px-4 py-2 rounded-lg text-white mt-4 hover:bg-sky-500 font-primary">
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateInventory;