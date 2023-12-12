import React, { useState } from 'react';
import './create-post.scss';
import Happenings from '../../models/happenings';
import { IUser } from '../../models/user';
import { useSelector } from 'react-redux';
import happeningsService from '../../services/happeningsService';

/**
 * Initial state for the CreatePost component.
 */
const initialState = {
  title: '',
  content: '',
  createdUser: {} as IUser,
  image: '',
};

/**
 * CreatePost component.
 */
const CreatePost: React.FC = () => {
  const locationId = useSelector((state: any) => state.location.pincode);
  const currentUser = useSelector((state: any) => state.user);
  const [newHappening, setNewHappening] = useState<Happenings>(initialState);
  const [imagePreview, setImagePreview] = useState<string | null>('');

  /**
   * Event handler for the title input change.
   * @param event - The change event.
   */
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewHappening({ ...newHappening, title: event.target.value });
  };

  /**
   * Event handler for the description textarea change.
   * @param event - The change event.
   */
  const onDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewHappening({ ...newHappening, content: event.target.value });
  };

  /**
   * Event handler for the file input change.
   * @param event - The change event.
   */
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewHappening({ ...newHappening, image: reader.result as string });
      };
    } else {
      setImagePreview('https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
      setNewHappening({ ...newHappening, image: 'https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' });
    }
  };
  
  /**
   * Event handler for creating a happening.
   * @param event - The form event.
   */
  const createHappening = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    happeningsService.createHappening(locationId, { ...newHappening, createdUser: currentUser?.user?._id });
    window.location.replace('/happenings');
  };

  return (
    <div className="write">
      {imagePreview && (
        <img className="writeImg" src={imagePreview} alt="Preview" />
      )}
      <form className="writeForm" onSubmit={createHappening}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={onTitleChange}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            autoFocus={true}
            onChange={onDescChange}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
