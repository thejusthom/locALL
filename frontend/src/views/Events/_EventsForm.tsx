import * as React from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/images/close-white.svg";

interface IEventsForm{
isEdit?: boolean;
onCloseModal: () => void;
onUpdate: (event: any) => void;
onSubmit: (event: any) => void;
eventName?: string;
isDisabled: boolean;
children: string | JSX.Element | JSX.Element[];
type: string;
}

const EventsForm = (props: IEventsForm) => {
    const {
        isEdit = false,
        onCloseModal,
        onUpdate,
        onSubmit,
        eventName,
        isDisabled,
        children,
        type
    } = props;
    return(
        <FormWrap>
        <Form>
            <Heading>
            <h1>
                {isEdit && !!eventName ? `Edit ${eventName}` : `Create ${type}`}
            </h1>
            <img src={CloseIcon} width={25} height={25} onClick={onCloseModal} />
            </Heading>
            <Content>
                {children}
        <div style={{textAlign: "center"}}>
    <Button 
    disabled={isDisabled}
    onClick={isEdit ? onUpdate : onSubmit}>{isEdit ? "Update" : "Submit"}</Button>
    </div>
    </Content>
      </Form>
      </FormWrap>
    );
};

export const Form = styled.form`
background-color: #ffffff;
width: 700px;
height: 75%;
place-self: center;
margin-top: 70px;
border-radius: 5px;
margin: 50px 0;
color: #171717;
overflow-y: auto;
label{
    font-size: 18px;
    width: 200px;
    text-align: left;
}
input, textarea, select{
    width: 440px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    &:focus{
        border: none;
        box-shadow: 0px 0px 7px 0.5px #b4b1b1;
    }
}
input:focus, textarea:focus{
    outline: 0;
}
textarea{
    height: 100px;
}
button{
    margin: 20px 0;
}
`;
export const Heading = styled.section`
background-color: #123abc;
position: fixed;
width: 700px;
border-radius: 5px 5px 0 0;
display: flex;
justify-content: space-between;
padding: 15px 20px;
align-items: center;
z-index: 10;
img{
    cursor: pointer;
}
h1{
    margin: 0;
    color: white;
    font-weight: normal;
    font-size: 25px;
}`;
const Content = styled.section`
height: 100%;
padding: 20px;
margin-top: 83px;
`;
const FormWrap = styled.section`
height: 100%;
justify-content: center;
display: flex;
`;
export const Button = styled.button`
background-color: #123abc;
color: white;
padding: 7px 20px;
cursor: pointer;
border: none;
border-radius: 25px;
font-size: 16px;
padding: 10px 25px;
&:disabled{
    background-color: #919090;
    cursor: unset;
}
`;

export default EventsForm;