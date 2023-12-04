import * as React from "react";
import styled from "styled-components";
import { iconList } from "./Constants";
import { IEvent } from "../../models/events";
import { SearchBox } from "@mapbox/search-js-react";
import DatePicker from "react-datepicker";

interface IFormFields{
newEvent: IEvent;
onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
startDate: Date | undefined;
endDate: Date | undefined;
selectedLocation: string;
organiser: {name: string; contact: string};
onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
onStartDateChange: (date: Date) => void;
onEndDateChange: (date: Date) => void;
onLocationChange: (event: any) => void;
onOrganiserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
isEdit: boolean;
accessToken: string;
}

const FormFieldsComponent = (props: IFormFields) => {
    const {
        newEvent,
        onCategoryChange,
        startDate,
        endDate, 
        selectedLocation,
        organiser,
        onNameChange,
        onDescriptionChange,
        onStartDateChange,
        onEndDateChange,
        onLocationChange,
        onOrganiserChange,
        isEdit, 
        accessToken
    } = props;
    const { eventName, descriptionInfo, category } = newEvent;
    return(
    <>
    <InputWrap>
    <label>Name: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="eventName" value={eventName} onChange={onNameChange} />
    </InputWrap>
    <InputWrap>
    <label>Description: <MandatoryStar>*</MandatoryStar></label>
    <textarea id="descriptionInfo" value={descriptionInfo} onChange={onDescriptionChange} />
    </InputWrap>
    <InputWrap>
    <label>Category: <MandatoryStar>*</MandatoryStar></label>
  <select onChange={onCategoryChange} value={category}>
  {iconList?.map((category) => { return<option value={category.label}>{category.label}</option>})}
  </select>
  </InputWrap>
  <InputWrap>
    <label>Start Date: <MandatoryStar>*</MandatoryStar></label>
 <DatePicker 
 selected={startDate} 
 onChange={onStartDateChange} />
  </InputWrap>
<InputWrap>
    <label>End Date: <MandatoryStar>*</MandatoryStar></label>
   <DatePicker 
 selected={endDate} 
 onChange={onEndDateChange} />
    </InputWrap>
 {!isEdit && <InputWrap>
  <label>Location: <MandatoryStar>*</MandatoryStar></label>
  <SearchBox 
accessToken={accessToken}
value={selectedLocation}
onRetrieve={onLocationChange}
/>
</InputWrap>}
<InputWrap>
    <label>Organiser Name: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="name" value={organiser?.name} onChange={onOrganiserChange} />
    </InputWrap>
    <InputWrap>
    <label>Organiser Contact: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="contact" value={organiser?.contact} onChange={onOrganiserChange} />
    </InputWrap>
    </>
)
};

const InputWrap = styled.div`
    margin-bottom: 20px;
    display: flex;
`;
const MandatoryStar = styled.span`
color: #A71313;
`;

export default FormFieldsComponent;