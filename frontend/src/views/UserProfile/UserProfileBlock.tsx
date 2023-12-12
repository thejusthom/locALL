import "../../assets/styles/user-profile.scss";
import { Form, Modal } from "semantic-ui-react";
import Button from "@mui/joy/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../models/user";
import userService from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import { saveUser } from "../../store/slices/user-slice";
import ProfilePic from "../../assets/images/Profile-pic.jpg";
import { Image } from "semantic-ui-react";
import { useEffect } from "react";
import happeningsService from "../../services/happeningsService";
import eventsService from "../../services/eventsService";
import feedShareService from "../../services/feedshareService";
import marketplaceService from "../../services/marketplaceService";
import donationService from "../../services/donationsService";

export default function UserProfileBlock() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const locationId = useSelector((state: any) => state.location.pincode);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordFormOpen, setPasswordFormOpen] = React.useState(false);
  const [passwords, setPasswords] = useState({
    passwordOne: "",
    passwordTwo: "",
  });

  const [donations, setDonations] = useState<any[]>([]);
  const [happenings, setHappenings] = useState<any[]>([]);
  const [feedShare, setFeedShare] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [marketplace, setMarketplace] = useState<any[]>([]);

  useEffect(() => {
    // Fetch and set data for donations
    fetchAndSetData('donations', setDonations, () => donationService.getDonationByParams(locationId,user?.user?._id));

    // Fetch and set data for happenings
    fetchAndSetData('happenings', setHappenings, () => happeningsService.getHappeningsByParams(locationId,user?.user?._id));

    // Fetch and set data for feedShare
    fetchAndSetData('feedShare', setFeedShare, () => feedShareService.getFeedshareByUser(locationId,user?.user?._id));

    // Fetch and set data for events
    fetchAndSetData('events', setEvents, () => eventsService.getEventByParams(locationId,user?.user?._id));

    // Fetch and set data for marketplace
    fetchAndSetData('marketplace', setMarketplace, () => marketplaceService.getMarketplaceByParams(locationId,user?.user?._id));
  }, [locationId]);

  /**
   * Fetches data and sets it using the provided setData function.
   * 
   * @param metric - The metric to fetch data for.
   * @param setData - The function to set the fetched data.
   * @param getData - The function that returns a promise to fetch the data.
   */
  const fetchAndSetData = async (
    metric: string,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    getData: () => Promise<any>
  ) => {
    try {
      const data = await getData();
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${metric}:`, error);
    }
  };

  /**
   * Renders a metric item with the given metric name and count.
   * 
   * @param metricName - The name of the metric.
   * @param metricCount - The count of the metric.
   * @returns The rendered metric item.
   */
  const renderMetricItem = (metricName: string, metricCount: number) => {
    return (
      <li className="bootstrap-iso list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 className="bootstrap-iso mb-0">{metricName}</h6>
        <span className="bootstrap-iso text-secondary">{metricCount}</span>
      </li>
    );
  };

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    user?.user?.userImage
  );
  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const [inputData, setInputData] = React.useState({
    firstName: user?.user?.person?.firstName,
    lastName: user?.user?.person?.lastName,
    email: user?.user?.person?.email,
    phoneNumber: user?.user?.person?.phoneNumber,
    address: user?.user?.person?.address,
    zipcode: user?.user?.person?.zipcode,
    username: user?.user?.username,
  });
  useEffect(() => {
    setInputData({
      firstName: user?.user?.person?.firstName,
      lastName: user?.user?.person?.lastName,
      email: user?.user?.person?.email,
      phoneNumber: user?.user?.person?.phoneNumber,
      address: user?.user?.person?.address,
      zipcode: user?.user?.person?.zipcode,
      username: user?.user?.username,
    });
    setImagePreview(user?.user?.userImage);
  }, [user]);
  const [passwordConfirmForm, setPasswordConfirmForm] = React.useState(false);
  const [editConfirmForm, setEditConfirmForm] = React.useState(false);

  /**
   * Handles the change event of the password input field.
   * @param event - The change event object.
   */
  const handlePassOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const updateData = { ...passwords };
    updateData[id as keyof typeof updateData] = event.target.value;
    setPasswords(updateData);
  };

  /**
   * Handles the change event of an input element.
   * @param event - The change event.
   */
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

  /**
   * Validates the password by comparing the values of `passwordOne` and `passwordTwo`.
   * If the passwords match, sets `passwordValid` to `true`, otherwise sets it to `false`.
   */
  const validatePassword = () => {
    if (passwords.passwordOne === passwords.passwordTwo) {
      console.log("passwords match");
      setPasswordValid(true);
    } else {
      console.log("passwords don't match");
      setPasswordValid(false);
    }
  };

  /**
   * Fills the input data with the user's information.
   */
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
      password: user?.user?.person?.password,
    };
    setInputData(filledData);
  };

  /**
   * Clears the form data by resetting the input fields to empty values.
   */
  const clearFormData = () => {
    const clData = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      zipcode: "",
      username: "",
    };
    setInputData(clData);
  };


  /**
   * Handles the confirmation of updating user data.
   * @returns {Promise<void>} A promise that resolves when the user data is updated successfully.
   */
  const handleUpdateUserDataConfirm = async () => {
    const userData: IUser = {
      _id: user?.user?._id,
      username: inputData.username,
      password: user?.user?.password,
      person: {
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        phoneNumber: inputData.phoneNumber,
        address: user?.user?.person?.address,
        zipcode: user?.user?.person?.zipcode,
      },
      userImage: imagePreview,
    };
    console.log(userData);
    try {
      await userService.updateUser(userData, user?.refreshToken).then(() => {
        if (editFormOpen === false) {
          setEditFormOpen(true);
        } else {
          setEditFormOpen(false);
        }
        clearFormData();
        const accessToken = user?.accessToken;
        const refreshToken = user?.refreshToken;
        const uUser = { user: userData, accessToken, refreshToken };
        localStorage.setItem("user", JSON.stringify(uUser));
        dispatch(saveUser(uUser));
        toast.success("User details Changed Successfully!");
        setEditConfirmForm(false);
      });
    } catch (error) {
      toast.error("User details Change failed!");
      console.error("Error updating user details:", error);
      setEditConfirmForm(false);
    }
  };

  /**
   * Handles the cancel action for updating user data.
   */
  const handleUpdateUserDataCancel = () => {
    setEditConfirmForm(false);
  };

  /**
   * Handles the file change event and updates the image preview.
   * @param event - The change event triggered by the file input.
   */
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
    }
  };

  /**
   * Handles the confirmation of password change.
   * 
   * @returns {Promise<void>} A promise that resolves when the password change is successful.
   */
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
          zipcode: user?.user?.person?.zipcode,
        },
        userImage: imagePreview,
      };
      try {
        await userService.updateUser(userData, user?.refreshToken).then(() => {
          const accessToken = user?.accessToken;
          const refreshToken = user?.refreshToken;
          const uUser = { user: userData, accessToken, refreshToken };
          localStorage.setItem("user", JSON.stringify(uUser));
          dispatch(saveUser(uUser));
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
          <div className="bootstrap-iso row gutters-sm">
            <div className="bootstrap-iso col-md-4 mb-3">
              <div className="bootstrap-iso card">
                <div className="bootstrap-iso card-body">
                  <div className="bootstrap-iso d-flex flex-column align-items-center text-center">
                    {user?.user?.userImage &&
                      user?.user?.userImage != "undefined" ? (
                      <img
                        src={user?.user?.userImage}
                        alt="Profile Pic"
                        className="bootstrap-iso rounded-circle"
                        width="150"
                      />
                    ) : (
                      <img
                        src={ProfilePic}
                        alt="Profile Pic"
                        className="bootstrap-iso rounded-circle"
                        width="150"
                      />
                    )}
                    <div className="bootstrap-iso mt-3 text-center">
                      <h4>
                        {user?.user?.person?.firstName}{" "}
                        {user?.user?.person?.lastName}
                      </h4>
                      <p className="bootstrap-iso text-secondary mb-1 text-center">
                        {user?.user?.person?.zipcode}
                      </p>
                      <p className="bootstrap-iso text-muted font-size-sm text-center">
                        {user?.user?.person?.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bootstrap-iso card mt-3">
                <p className="bootstrap-iso text-sm mb-0 text-center h4">
                  My Contributions
                </p>
                <ul className="bootstrap-iso list-group list-group-flush">
                  {renderMetricItem('Events', events.length)}
                  {renderMetricItem('MarketPlace', marketplace.length)}
                  {renderMetricItem('FeedShare', feedShare.length)}
                  {renderMetricItem('Happenings', happenings.length)}
                  {renderMetricItem('Donations', donations.length)}
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
                      <button
                        className="bootstrap-iso btn password-btn"
                        onClick={() => setPasswordFormOpen(true)}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="bootstrap-iso row">
                    <div className="bootstrap-iso col-sm-12">
                      <button
                        className="bootstrap-iso btn edit-btn"
                        onClick={() => {
                          setEditFormOpen(true);
                          fillInputData();
                        }}
                      >
                        Edit
                      </button>
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
          <Form.Field
            required
            label="Password"
            control="input"
            type="password"
            width={8}
            value={passwords.passwordOne}
            onChange={handlePassOnChange}
            id="passwordOne"
          />
          <Form.Field
            required
            label="Retype Password"
            control="input"
            type="password"
            width={8}
            onKeyUp={validatePassword}
            value={passwords.passwordTwo}
            onChange={handlePassOnChange}
            id="passwordTwo"
            error={!passwordValid}
          />
          <Button
            type="submit"
            size="md"
            color="primary"
            disabled={!passwordValid}
            sx={{ float: "right", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
            onClick={() => setPasswordConfirmForm(true)}
          >
            Change
          </Button>
          <Button
            variant="solid"
            size="md"
            color="primary"
            sx={{ float: "left", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
            onClick={() => setPasswordFormOpen(false)}
          >
            Close
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
        }}
        onOpen={() => {
          console.log("open");
          setEditFormOpen(true);
          fillInputData();
        }}
      >
        <Modal.Header>Edit Personal Details</Modal.Header>
        <Form>
          <Form.Group grouped>
            <Form.Field
              label="First Name"
              control="input"
              width={8}
              value={inputData.firstName}
              onChange={handleOnChange}
              id="firstName"
            />
            <Form.Field
              label="Last Name"
              control="input"
              width={8}
              value={inputData.lastName}
              onChange={handleOnChange}
              id="lastName"
            />
            <Form.Field
              label="Phone Number"
              control="input"
              width={6}
              value={inputData.phoneNumber}
              onChange={handleOnChange}
              id="phoneNumber"
            />
            <Image
              size="medium"
              style={{ position: "sticky", top: 0 }}
              src={imagePreview}
              srcSet={imagePreview}
              alt={"No images added"}
              label="Profile Pic Preview"
              wrapped
            />
            <Form.Input
              fluid
              label="Upload your photo"
              type="file"
              id="image"
              onChange={onFileChange}
            />
          </Form.Group>
          <Button
            type="submit"
            onClick={() => {
              setEditConfirmForm(true);
            }}
            size="md"
            color="primary"
            sx={{ float: "right", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
          >
            Change
          </Button>
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
          <Button
            color="success"
            onClick={handlePasswordChangeConfirm}
            sx={{ mr: 2 }}
          >
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
          <Button
            color="success"
            onClick={handleUpdateUserDataConfirm}
            sx={{ mr: 2 }}
          >
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
