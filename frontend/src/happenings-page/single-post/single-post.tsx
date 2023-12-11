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

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { id, value } = event.target;
    setEditedData((prevData) => ({ ...prevData, [id]: value }));
  };

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

  const handleEditSubmit = async () => {
    try {
      // Send a PUT request to update the happening
      await happeningsService.updateHappening(locationId, happeningId, editedData);
      // Refresh the happening data after a successful update
      const updatedHappening = await happeningsService.getHappeningById(locationId, happeningId);
      console.log(updatedHappening);
      setHappening(updatedHappening);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating happening:', error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Send a DELETE request to delete the happening
      await happeningsService.deleteHappening(locationId, happeningId);
      // Close the delete confirmation modal
      setIsDeleteModalOpen(false);
      window.location.replace('/happenings');
    } catch (error) {
      console.error('Error deleting happening:', error);
    }
  };

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
                  : happening.createdUser?.person?.firstName}
                {typeof happening.createdUser === 'string'
                  ? 'A'
                  : happening.createdUser?.person?.lastName}
              </b>{' '}
            </span>
            <span className="singlePostDate">{happening.postedDate}</span>
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
    </div>
  );
};

export default SinglePost;
