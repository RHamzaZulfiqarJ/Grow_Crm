import { Close } from "@mui/icons-material";
import { DialogActions, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateTask } from "../../redux/action/task";
import { useDispatch, useSelector } from "react-redux";
import { getTaskReducer } from "../../redux/reducer/task";
import {
  PiHandCoins,
  PiHouseLine,
  PiImage,
  PiImages,
  PiMapPinLine,
  PiNotepad,
  PiRuler,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { pakistanCities } from "../../constant";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen }) => {
  ///////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentTask: task, isFetching, error } = useSelector((state) => state.task);
  const initialTaskState = {
    completedTask: '',
    completedTaskDate: '',
    completedTaskStatus: '',
    completedTaskComment: '',
    newTask: '',
    newTaskDeadline: '',
    newTaskComment: ''
  }
  const newTasks = [
    { name: 'Do Nothing', value: "doNothing" },
    { name: 'Contact Client', value: "contactClient" },
    { name: 'Sent Availablity List', value: "sentAvailablityList" },
    { name: 'Follow Up', value: "followUp" },
    { name: 'Arrange Meeting', value: "arrangeMeeting" },
    { name: 'Push Meeting', value: "pushMeeting" },
    { name: 'Meet Client', value: "meetClient" },
    { name: 'Sign Agreement', value: "signAgreement" },
    { name: 'Recieve Token', value: "recieveToken" },
  ]
  const completedTasks = [
    { name: 'New', value: "new" },
    { name: 'Sent Availablity List', value: "sentAvailablityList" },
    { name: 'Site Visit', value: "siteVisit" },
    { name: 'Token Recieved', value: "tokenRecieved" },
    { name: 'Closed (Won', value: "closedWon" },
    { name: 'Closed (Lost', value: "closedLost" },
    { name: 'Followed Up (Call', value: "followedUpCall" },
    { name: 'Followed Up (Email', value: "followedUpEmail" },
    { name: 'Contacted Client (Call', value: "contactedCall" },
    { name: 'Contacted Client (Call Attempt', value: "contactedCallAttempt" },
    { name: 'Contacted Client (Email', value: "contactedEmail" },
    { name: 'Meeting (Done', value: "meetingDone" },
    { name: 'Meeting (Attempt', value: "meetingAttempt" },
  ]
  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [taskData, setTaskData] = useState(task);

  ///////////////////////////////////// USE EFFECTS ///////////////////////////////////
  useEffect(() => {
    setTaskData(task);
  }, [task]);

  ///////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    const { completedTask, completedTaskComment, completedTaskDate, completedTaskStatus, newTask, newTaskComment, newTaskDeadline } = taskData
    e.preventDefault();
    if (!completedTask || !completedTaskComment || !completedTaskDate || !completedTaskStatus || !newTask || !newTaskComment || !newTaskDeadline)
      return alert("Make sure to rovide all the fields");
    dispatch(updateTask(taskData?._id, taskData));
    setTaskData(initialTaskState)
    setOpen(false)
  };

  const handleInputChange = (field, value) => {
    setTaskData((pre) => ({ ...pre, [field]: value, }));
  };
  const handleClose = () => {
    setOpen(false);
    setOpenFromNavbar(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400">Add New Task</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Task Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Task </td>
                <td className="pb-4">
                      <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={completedTasks}
                    value={taskData?.completedTask}
                    getOptionLabel={(task) => task.name ? task.name : task}
                    onChange={(e, task) => handleChange('completedTask', task.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Completed Date </td>
                <td className="pb-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DesktopDatePicker"]}>
                      <DesktopDatePicker
                        onChange={(date) => handleInputChange("completedTaskDate", date.$d)}
                        slotProps={{ textField: { size: "small", fullWidth: "true" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Status </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={[{ name: 'Successful', value: 'successful' }, { name: 'Unsuccessful', value: 'unsuccessful' }]}
                    value={taskData?.completedTaskStatus}
                    getOptionLabel={(status) => status.name ? status.name : status}
                    onChange={(e, status) => handleChange('completedTaskStatus', status.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Comment </td>
                <td className="pb-4">
                  <TextField
                    multiline
                    rows={5}
                    type="text"
                    value={taskData?.completedTaskComment}
                    onChange={(e) => handleInputChange('completedTaskComment', e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Next Task </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={newTasks}
                    value={taskData?.newTask}
                    getOptionLabel={(task) => task.name ? task.name : task}
                    onChange={(e, task) => handleChange('newTask', task.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Deadline </td>
                <td className="pb-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DesktopDatePicker"]}>
                      <DesktopDatePicker
                        onChange={(date) => handleInputChange("newTaskDeadline", date.$d)}
                        slotProps={{ textField: { size: "small", fullWidth: "true" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Comment </td>
                <td className="pb-4">
                  <TextField
                    multiline
                    rows={5}
                    type="text"
                    value={taskData?.newTaskComment}
                    onChange={(e) => handleInputChange('newTaskComment', e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            variant="contained"
            onClick={handleSubmit}
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default EditModal;
