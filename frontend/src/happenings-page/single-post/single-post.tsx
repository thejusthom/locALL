/**
 * SinglePost component displays a single happening post.
 * It allows the user to view, edit, and delete the happening.
 */
import React, { useEffect, useState } from 'react';
import './single-post.scss';
import { useLocation } from 'react-router-dom';
import happeningsService from '../../services/happeningsService';
import Happenings from '../../models/happenings';
import { useSelector } from 'react-redux';
import { Modal, Form, Button, Image } from 'semantic-ui-react';
import {
  Button as Buttons,
  Card,
  Typography
} from '@mui/material';
import { IUser } from '../../models/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * SinglePost component
 */
const SinglePost: React.FC = () => {
  const [happening, setHappening] = useState({} as Happenings);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    title: '',
    content: '',
    image: '',
    createdUser: {} as IUser
  });
  const currentUser = useSelector((state: any) => state.user);
  console.log(currentUser);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const locationId = useSelector((state: any) => state.location.pincode);
  const happeningPathObj = useLocation();
  console.log(happeningPathObj);
  const happeningPath = happeningPathObj.pathname.split('/');
  const happeningId = happeningPath[2];
  console.log(happeningId);

  useEffect(() => {
    console.log(locationId);
    happeningsService.getHappeningById(locationId, happeningId).then((happening) => setHappening(happening));
  }, [happeningId]);

  /**
   * Handles the click event when the user clicks the Edit button.
   * Populates the form with existing data and sets the isEditing state to true.
   */
  const handleEditClick = () => {
    // Populate the form with existing data
    setEditedData({
      title: happening.title,
      content: happening.content,
      image: happening.image,
      createdUser: currentUser.user._id
    });
    setIsEditing(true);
  };

  /**
   * Handles the change event when the user edits the form inputs.
   * Updates the editedData state with the new values.
   * @param event - The change event
   */
  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { id, value } = event.target;
    setEditedData((prevData) => ({ ...prevData, [id]: value }));
  };

  /**
   * Handles the change event when the user selects an image file.
   * Reads the file and updates the editedData state with the image data.
   * @param event - The change event
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setEditedData((prevData) => ({ ...prevData, image: reader.result as string }));
      };
    }
  };

  /**
   * Handles the submit event when the user clicks the Save Changes button.
   * Sends a PUT request to update the happening.
   * Refreshes the happening data after a successful update.
   * Displays a success toast message.
   */
  const handleEditSubmit = async () => {
    try {
      // Send a PUT request to update the happening
      await happeningsService.updateHappening(locationId, happeningId, editedData);
      // Refresh the happening data after a successful update
      const updatedHappening = await happeningsService.getHappeningById(locationId, happeningId);
      console.log(updatedHappening);
      setHappening(updatedHappening);
      setIsEditing(false);
      toast.success('Happening updated successfully');
    } catch (error) {
      console.error('Error updating happening:', error);
      toast.error('Error updating happening');
    }
  };

  /**
   * Handles the click event when the user clicks the Delete button.
   * Opens the delete confirmation modal.
   */
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  function formatTimestamp(timestamp?: string): string {
    if (!timestamp) {
      return 'Timestamp is undefined';
    }

    const timestampValue = parseInt(timestamp, 10);
    if (isNaN(timestampValue)) {
      return 'Invalid timestamp';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = new Date(timestampValue).toLocaleString('en-US', options);
    return formattedDate;
  }

  /**
   * Handles the click event when the user confirms the deletion.
   * Sends a DELETE request to delete the happening.
   * Closes the delete confirmation modal.
   * Redirects the user to the happenings page.
   * Displays a success toast message.
   */
  const handleDeleteConfirm = async () => {
    try {
      // Send a DELETE request to delete the happening
      await happeningsService.deleteHappening(locationId, happeningId);
      // Close the delete confirmation modal
      setIsDeleteModalOpen(false);
      window.location.replace('/happenings');
      toast.success('Happening deleted successfully');
    } catch (error) {
      console.error('Error deleting happening:', error);
      toast.error('Error deleting happening');
    }
  };

  /**
   * Handles the click event when the user cancels the deletion.
   * Closes the delete confirmation modal.
   */
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="singlePost">

      <Card sx={{ width: '100%', margin: '0 auto', padding: '20px' }}>
        <img className="singlePostImg" src={happening.image} alt="" style={{ width: '100%', marginBottom: '20px' }} />
        <div className="singlePostCardContent">
          <Typography variant="h5" component="div" style={{ textAlign: 'center', marginBottom: '50px'}}>
          <h1 className="singlePostTitle">
            {happening.title}

            { currentUser.isLoggedIn && currentUser.user._id === happening.createdUser?._id && <div className="singlePostEdit" style={{ marginTop: '10px', textAlign: 'center' }}>
              <Button onClick={handleEditClick} variant="outlined" style={{ marginRight: '10px' }}>
                Edit
              </Button>
              <Button onClick={handleDeleteClick} variant="outlined">
                Delete
              </Button>
            </div> }
          </h1>
            
          </Typography>

          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <b>
                {typeof happening.createdUser === 'string'
                  ? 'Shashikar'
                  : ` ${happening.createdUser?.person?.firstName}`}
                {typeof happening.createdUser === 'string'
                  ? 'A'
                  : ` ${happening.createdUser?.person?.lastName}`}
              </b>
            </span>
            <span className="singlePostDate">{formatTimestamp(happening.postedDate)}</span>
          </div>

          <p className="singlePostDesc" style={{ marginTop: '20px' }}>
            {happening.content}
          </p>
        </div>
      </Card>

      {/* Edit Form Modal */}
      <Modal dimmer="inverted" open={isEditing} onClose={() => setIsEditing(false)}>
        <Modal.Header>Edit Happening</Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Form.Input
              fluid
              id="title"
              label="Title"
              placeholder="Happening title"
              value={editedData.title}
              onChange={handleEditChange}
              required
            />
            <Form.TextArea
              label="Content"
              id="content"
              placeholder="Describe the happening..."
              value={editedData.content}
              onChange={handleEditChange}
              required
            />
            <Form.Field>
              <label htmlFor="file">Upload Image</label>
              <input type="file" id="file" accept="image/*" onChange={handleImageChange} />
            </Form.Field>
            {editedData.image && (
              <Image size="medium" style={{ marginTop: '10px' }} src={editedData.image} alt="Image Preview" wrapped />
            )}
            <Button color="teal" style={{ display: 'block', marginTop: '15px' }} onClick={handleEditSubmit} type="button">
              Save Changes
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </Modal.Actions>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal dimmer="inverted" open={isDeleteModalOpen} onClose={handleDeleteCancel}>
        <Modal.Header>Delete Happening</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this happening?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleDeleteConfirm}>
            Delete
          </Button>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
        </Modal.Actions>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default SinglePost;
