import React, { useEffect, useState} from 'react';
import './create-post.scss';
import Happenings from '../../models/happenings';
import { IUser } from '../../models/user';
import { useSelector } from 'react-redux';
import happeningsService from '../../services/happeningsService';

const initialState = {
  title: '',
  content: '',
  createdUser: '',
  image: 'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

const CreatePost: React.FC = () =>{
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");
  // const [file, setFile] = useState(null);
  const [user, setUser] = useState({} as IUser);
  const locationId = useSelector((state: any) => state.location.pincode);
  const [newHappening, setNewHappening] = useState<Happenings>(initialState);

  const onTitleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setNewHappening({...newHappening, title: event.target.value});
  };

  const onDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewHappening({...newHappening, content: event.target.value});
  };

  const createHappening = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    happeningsService.createHappening("02119", {...newHappening, createdUser: '656c36ac5a586d16ebae1886'});
    window.location.replace('/happenings');
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm" onSubmit={createHappening}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} />
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
  )
};

export default CreatePost;

