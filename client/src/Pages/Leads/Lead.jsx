import React, { useEffect } from "react";
import LeadTopbar from "./LeadTopBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../redux/action/lead";
import { format } from "timeago.js";

const Lead = () => {

    const dispatch = useDispatch()
    const { leadId } = useParams()
    const { currentLead, isFetching, error } = useSelector(state => state.lead)

    useEffect(() => {
        dispatch(getLead(leadId))
    }, [leadId])

    return (
        <div className='h-full w-full'>
            <LeadTopbar leadId={leadId} isAppliedForRefund={currentLead?.isAppliedForRefund} />

            <div className="bg-white rounded-lg shadow-md h-screen w-full mt-5">

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10 columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">FirstName</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">LastName</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Gender</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{currentLead?.clientId?.firstName}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{currentLead?.clientId?.lastName}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{currentLead?.clientId?.gender}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">CNIC</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Phone</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Email</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{currentLead?.clientId?.cnic}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{currentLead?.clientId?.phone}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{currentLead?.clientId?.email}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">City</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Location Area</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Property Type</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{currentLead?.city}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{currentLead?.region}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{currentLead?.propertyType}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Home Type</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Min Area</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Max Area</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{currentLead?.homeType}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{currentLead?.minArea} {currentLead?.minAreaUnit}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{currentLead?.maxArea} {currentLead?.maxAreaUnit}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Min Budget</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Max Budget</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Lead Priority</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{currentLead?.minBudget} {currentLead?.minBudgetUnit}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{currentLead?.maxBudget} {currentLead?.maxBudgetUnit}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{currentLead?.priority}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Client Type</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Beds</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Source</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{currentLead?.clientType}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{currentLead?.beds}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{currentLead?.source[0]}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Submitted</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Allocated to</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Status</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{format(currentLead?.createdAt)}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{currentLead?.allocatedTo?.email}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{currentLead?.status}</div>
                </div>

            </div>

        </div>
    );
};

export default Lead