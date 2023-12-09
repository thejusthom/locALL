import * as React from "react";
import { InputWrap, MandatoryStar } from "../Events/_FormFields";
import { donationCategories } from "./Constants";
import { IDonation } from "../../models/donation";

interface IDonationForm{
    isEdit: boolean;
newDonation: IDonation;
onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
onReceiverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DonationForm = (props: IDonationForm) => {
    const { 
        newDonation,
        onNameChange,
        onReceiverChange,
        onDescriptionChange,
        onCategoryChange,
        onAmountChange,
        onImageChange
    } = props;

return(
    <>
      <InputWrap>
    <label>Title: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="donationName" value={newDonation.donationName} onChange={onNameChange} />
    </InputWrap>
        <InputWrap>
    <label>Name: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="name" value={newDonation.receiver?.name} onChange={onReceiverChange} />
    </InputWrap>
    <InputWrap>
    <label>Age: <MandatoryStar>*</MandatoryStar></label>
    <input type="number" id="age" value={newDonation.receiver?.age} onChange={onReceiverChange} />
    </InputWrap>
    <InputWrap>
    <label>Photo: <MandatoryStar>*</MandatoryStar></label>
    <input
        type="file"
        name="photo"
        onChange={onImageChange}
      />
    </InputWrap>
    <InputWrap>
    <label>Contact: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="contact" value={newDonation.receiver?.contact } onChange={onReceiverChange} />
    </InputWrap>
    <InputWrap>
    <label>Description: <MandatoryStar>*</MandatoryStar></label>
    <textarea id="descriptionInfo" value={newDonation.descriptionInfo} onChange={onDescriptionChange} />
    </InputWrap>
    <InputWrap>
    <label>Category: <MandatoryStar>*</MandatoryStar></label>
  <select onChange={onCategoryChange} value={newDonation.category}>
  {donationCategories?.map((category) => { return<option value={category.id}>{category.label}</option>})}
  </select>
  </InputWrap>
  <InputWrap>
    <label>Amount Required: <MandatoryStar>*</MandatoryStar></label>
    <input type="number" id="amount" value={newDonation.amountRequired} onChange={onAmountChange} />
  </InputWrap>
    </>
);
};

export default DonationForm;