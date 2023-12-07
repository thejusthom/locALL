import React from 'react';

const UserProfileView = () => {
    return (
        <div className="user-profile">
            <div className="user-profile-header">
                <img src="user-avatar.jpg" alt="User Avatar" className="user-avatar" />
                <h1 className="user-name">John Doe</h1>
                <p className="user-email">john.doe@example.com</p>
            </div>
            <div className="user-profile-content">
                <h2>About Me</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.</p>
                <h2>Interests</h2>
                <ul>
                    <li>Reading</li>
                    <li>Traveling</li>
                    <li>Photography</li>
                </ul>
            </div>
        </div>
    );
}

export default UserProfileView;
