import '../../assets/styles/user-profile.scss';
import { Form, Modal } from "semantic-ui-react";
import Button from "@mui/joy/Button";
import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../models/user';
import { SearchBox } from '@mapbox/search-js-react';
import userService from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import { saveUser } from '../../store/slices/user-slice';

export default function UserProfileBlock() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFormOpen, setPasswordFormOpen] = React.useState(false);
    const [passwords, setPasswords] = useState({
        passwordOne: "",
        passwordTwo: ""
    });
    const [editFormOpen, setEditFormOpen] = React.useState(false);
    const [inputData, setInputData] = React.useState({
        firstName: user?.user?.person?.firstName,
        lastName: user?.user?.person?.lastName,
        email: user?.user?.person?.email,
        phoneNumber: user?.user?.person?.phoneNumber,
        address: user?.user?.person?.address,
        zipcode: user?.user?.person?.zipcode,
        username: user?.user?.username
    });
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({ latitude: 0, longitude: 0 });
    const [add, setAdd] = React.useState('');
    const [passwordConfirmForm, setPasswordConfirmForm] = React.useState(false);
    const [editConfirmForm, setEditConfirmForm] = React.useState(false);

    const handlePassOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const updateData = { ...passwords };
        updateData[id as keyof typeof updateData] = event.target.value;
        setPasswords(updateData);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const updateData = { ...inputData };
        if (
            event.target instanceof HTMLInputElement &&
            event.target.type === "file"
        ) {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    reader.result as string;
                    updateData[id as keyof typeof updateData] = reader.result as string;
                    console.log(updateData);
                    setInputData(updateData);
                };
                return;
            }
        }
        setInputData({ ...inputData });
        updateData[id as keyof typeof updateData] = event.target.value;
        setInputData(updateData);
    };

    const validatePassword = () => {
        if (passwords.passwordOne === passwords.passwordTwo) {
            console.log("passwords match");
            setPasswordValid(true);
        } else {
            console.log("passwords don't match");
            setPasswordValid(false);
        }
    }

    const fillInputData = () => {
        console.log("fill");
        const filledData = {
            firstName: user?.user?.person?.firstName,
            lastName: user?.user?.person?.lastName,
            email: user?.user?.person?.email,
            phoneNumber: user?.user?.person?.phoneNumber,
            address: user?.user?.person?.address,
            zipcode: user?.user?.person?.zipcode,
            username: user?.user?.username,
            password: user?.user?.person?.password
        };
        setInputData(filledData);
    }

    const clearFormData = () => {
        const clData = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            zipcode: "",
            username: ""
        };
        setInputData(clData);
    };

    const onLocationChange = (event: any) => {
        const location = event?.features[0]?.geometry?.coordinates;
        setCoordinates({ longitude: location[0], latitude: location[1] });
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location[1]}&lon=${location[0]}&format=json`, {
            headers: {
                'User-Agent': 'ID of your APP/service/website/etc. v0.1'
            }
        }).then(res => res.json())
            .then(res => {
                setAdd(res.address.postcode)
                const address = event?.features[0]?.properties?.full_address;
                setSelectedLocation(!!address ? address : res.address.postcode);
            })
    };

    const handleUpdateUserDataConfirm = async () => {
        const userData: IUser = {
            _id: user?.user?._id,
            username: inputData.username,
            password: user?.user?.password,
            person: {
                firstName: inputData.firstName,
                lastName: inputData.lastName,
                phoneNumber: inputData.phoneNumber,
                address: selectedLocation,
                zipcode: add
            }
        };
        console.log(userData);
        try {
            // const validatedUser = await userService.loginUser(user);
            // console.log(validatedUser);
            // localStorage.setItem("user", JSON.stringify(validatedUser));
            // dispatch(saveUser(validatedUser));
            await userService.updateUser(userData).then(() => {
                if (editFormOpen === false) {
                    setEditFormOpen(true);
                } else {
                    setEditFormOpen(false);
                }
                clearFormData();
                toast.success("User details Changed Successfully!");
                setEditConfirmForm(false);
            });
        }
        catch (error) {
            toast.error("User details Change failed!");
            console.error("Error updating user details:", error);
            setEditConfirmForm(false);
        }
    }
    const handleUpdateUserDataCancel = () => {
        setEditConfirmForm(false);
    };

    const handlePasswordChangeConfirm = async () => {
        {
            const userData: IUser = {
                _id: user?.user?._id,
                username: user?.user?.username,
                password: passwords.passwordTwo,
                person: {
                    firstName: user?.user?.person?.firstName,
                    lastName: user?.user?.person?.lastName,
                    phoneNumber: user?.user?.person?.phoneNumber,
                    address: user?.user?.person?.address,
                    zipcode: user?.user?.person?.zipcode
                }
            };
            try {
                await userService.updateUser(userData)
                    .then(() => {
                        setPasswordConfirmForm(false);
                        toast.success("Password Changed Successfully!");
                    });
            } catch (error) {
                toast.error("Password Change failed!");
                console.error("Error changing password:", error);
                setPasswordConfirmForm(false);
            }
        }
    };

    const handlePasswordChangeCancel = () => {
        setPasswordConfirmForm(false);
    };

    return (
        <>
            <ToastContainer position="top-center" closeOnClick />

            <div className="bootstrap-iso container">
                <div className="bootstrap-iso main-body">

                    {/* <nav aria-label="breadcrumb" className="bootstrap-iso main-breadcrumb">
                    <ul className="bootstrap-iso breadcrumb">
                        <li className="bootstrap-iso breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="bootstrap-iso breadcrumb-item active" aria-current="page">User Profile</li>
                    </ul>
                </nav> */}

                    <div className="bootstrap-iso row gutters-sm">
                        <div className="bootstrap-iso col-md-4 mb-3">
                            <div className="bootstrap-iso card">
                                <div className="bootstrap-iso card-body">
                                    <div className="bootstrap-iso d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="bootstrap-iso rounded-circle" width="150" />
                                        <div className="bootstrap-iso mt-3 text-center">
                                            <h4>{user?.user?.person?.firstName}{" "}{user?.user?.person?.lastName}</h4>
                                            <p className="bootstrap-iso text-secondary mb-1 text-center">{user?.user?.person?.zipcode}</p>
                                            <p className="bootstrap-iso text-muted font-size-sm text-center">{user?.user?.person?.address}</p>
                                            {/* <button className="bootstrap-iso btn btn-primary">Follow</button>
                                        <button className="bootstrap-iso btn btn-outline-primary">Message</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bootstrap-iso card mt-3">
                                <p className="bootstrap-iso text-sm mb-0 text-center h4">My Contributions</p>
                                <ul className="bootstrap-iso list-group list-group-flush">
                                    <li className="bootstrap-iso list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="bootstrap-iso mb-0">Events</h6>
                                        <span className="bootstrap-iso text-secondary">1</span>
                                    </li>
                                    <li className="bootstrap-iso list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="bootstrap-iso mb-0">MarketPlace</h6>
                                        <span className="bootstrap-iso text-secondary">0</span>
                                    </li>
                                    <li className="bootstrap-iso list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="bootstrap-iso mb-0">FeedShare</h6>
                                        <span className="bootstrap-iso text-secondary">5</span>
                                    </li>
                                    <li className="bootstrap-iso list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="bootstrap-iso mb-0">Happenings</h6>
                                        <span className="bootstrap-iso text-secondary">2</span>
                                    </li>
                                    <li className="bootstrap-iso list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="bootstrap-iso mb-0">Donations</h6>
                                        <span className="bootstrap-iso text-secondary">7</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bootstrap-iso col-md-8">
                            <div className="bootstrap-iso card mb-3">
                                <div className="bootstrap-iso card-body">
                                    <div className="bootstrap-iso row">
                                        <div className="bootstrap-iso col-sm-3">
                                            <h6 className="bootstrap-iso mb-0">First Name</h6>
                                        </div>
                                        <div className="bootstrap-iso col-sm-9 text-secondary">
                                            {user?.user?.person?.firstName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="bootstrap-iso row">
                                        <div className="bootstrap-iso col-sm-3">
                                            <h6 className="bootstrap-iso mb-0">Last Name</h6>
                                        </div>
                                        <div className="bootstrap-iso col-sm-9 text-secondary">
                                            {user?.user?.person?.lastName}
                                        </div>
                                    </div>
                                    <hr />
                                    {/* <div className="bootstrap-iso row">
                                    <div className="bootstrap-iso col-sm-3">
                                        <h6 className="bootstrap-iso mb-0">Email</h6>
                                    </div>
                                    <div className="bootstrap-iso col-sm-9 text-secondary">
                                    {user?.user?.person?.email}
                                    </div>
                                </div> 
                                <hr />*/}
                                    <div className="bootstrap-iso row">
                                        <div className="bootstrap-iso col-sm-3">
                                            <h6 className="bootstrap-iso mb-0">Phone</h6>
                                        </div>
                                        <div className="bootstrap-iso col-sm-9 text-secondary">
                                            {user?.user?.person?.phoneNumber}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="bootstrap-iso row">
                                        <div className="bootstrap-iso col-sm-3">
                                            <h6 className="bootstrap-iso mb-0">Address</h6>
                                        </div>
                                        <div className="bootstrap-iso col-sm-9 text-secondary">
                                            {user?.user?.person?.address}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="bootstrap-iso row">
                                        <div className="bootstrap-iso col-sm-3">
                                            <h6 className="bootstrap-iso mb-0">Username</h6>
                                        </div>
                                        <div className="bootstrap-iso col-sm-9 text-secondary">
                                            {user?.user?.username}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="bootstrap-iso row">
                                        <div className="bootstrap-iso col-sm-3">
                                            <h6 className="bootstrap-iso mb-0">Password</h6>
                                        </div>
                                        <div className="bootstrap-iso col-sm-9 text-secondary">
                                            ***********
                                            <button className="bootstrap-iso btn password-btn" onClick={() => setPasswordFormOpen(true)} >Change Password</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="bootstrap-iso row">
                                        <div className="bootstrap-iso col-sm-12">
                                            <button className="bootstrap-iso btn edit-btn" onClick={() => setEditFormOpen(true)}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={passwordFormOpen}
                onClose={() => setPasswordFormOpen(false)}
                onOpen={() => setPasswordFormOpen(true)}
            >
                <Modal.Header>Reset Password</Modal.Header>
                <Form>
                    <Form.Field required label='Password' control='input' type='password' width={8}
                        value={passwords.passwordOne}
                        onChange={handlePassOnChange}
                        id="passwordOne" />
                    <Form.Field required label='Retype Password' control='input' type='password' width={8} onKeyUp={validatePassword}
                        value={passwords.passwordTwo}
                        onChange={handlePassOnChange}
                        id="passwordTwo"
                        error={!passwordValid}
                    />
                    <Button type="submit"
                        size="md"
                        color="primary"
                        disabled={!passwordValid}
                        sx={{ float: "right", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
                        onClick={() => setPasswordConfirmForm(true)}>
                        Change</Button>
                    <Button
                        variant="solid"
                        size="md"
                        color="primary"
                        sx={{ float: "left", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
                        onClick={() => setPasswordFormOpen(false)}
                    >Close
                    </Button>
                </Form>
            </Modal>

            <Modal
                dimmer="inverted"
                open={editFormOpen}
                onClose={() => {
                    console.log("close");
                    fillInputData();
                    setEditFormOpen(false);
                    clearFormData();
                }
                }
                onOpen={() => {
                    console.log("open");
                    setEditFormOpen(true);
                    fillInputData();
                }
                }
            >
                <Modal.Header>Edit Personal Details</Modal.Header>
                <Form>
                    <Form.Group grouped>
                        <Form.Field label='First Name' control='input' width={8}
                            value={inputData.firstName}
                            onChange={handleOnChange}
                            id="firstName" />
                        <Form.Field label='Last Name' control='input' width={8}
                            value={inputData.lastName}
                            onChange={handleOnChange}
                            id="lastName" />
                        <Form.Field label='Phone Number' control='input' width={6}
                            value={inputData.phoneNumber}
                            onChange={handleOnChange}
                            id="phoneNumber" />
                        <Form.Field label='Location' />
                        {!!process.env.REACT_APP_MAPBOX_API_KEY &&
                            <SearchBox
                                accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'}
                                value={selectedLocation}
                                onRetrieve={onLocationChange}
                            />}
                        <Form.Input
                            fluid
                            label="Upload your photo"
                            type="file"
                            id="image"
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    <Form.Field label='Username' control='input' width={8}
                        value={inputData.username}
                        onChange={handleOnChange}
                        id="username" />
                    <Button type="submit" onClick={() => {
                        setEditConfirmForm(true);
                    }}
                        size="md"
                        color="primary"
                        sx={{ float: "right", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}>
                        Change</Button>
                    <Button
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ float: "left", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
                        onClick={() => {
                            setEditFormOpen(false);
                            clearFormData();
                        }}
                    >
                        Close
                    </Button>
                </Form>
            </Modal>

            <Modal
                dimmer="inverted"
                open={passwordConfirmForm}
                onClose={handlePasswordChangeCancel}
            >
                <Modal.Header>Change Password</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to change your password?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="success" onClick={handlePasswordChangeConfirm} sx={{ mr: 2 }}>
                        Yes
                    </Button>
                    <Button color="neutral" onClick={handlePasswordChangeCancel}>
                        No
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                dimmer="inverted"
                open={editConfirmForm}
                onClose={handleUpdateUserDataCancel}
            >
                <Modal.Header>Edit User Profile</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to edit user profile?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="success" onClick={handleUpdateUserDataConfirm} sx={{ mr: 2 }}>
                        Yes
                    </Button>
                    <Button color="neutral" onClick={handleUpdateUserDataCancel}>
                        No
                    </Button>
                </Modal.Actions>
            </Modal>


        </>
    );

}
