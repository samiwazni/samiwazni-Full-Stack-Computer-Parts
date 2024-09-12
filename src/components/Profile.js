import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import ProfileImage from "../assets/default-profile-image.png"
import "../style/style.scss";

const Profile = ({
  setCurrentUser,
  currentUser,
  onSubmit,
  handleCredentialChange,
  handleSignout,
  refreshProfileData,
}) => {
  const [currentOperation, setCurrentOperation] = useState("");
  const navigate = useNavigate();

  const closeForm = () => {
    setCurrentOperation("");
  };

  const handleModifyProfile = () => {
    setCurrentOperation("edit");
  };

  const renderUserForm = () => {
    if (currentOperation === "edit") {
      // For modifying existing users
      return (
        <div id="userform" className="mt-4">
          <Form onSubmit={handleSubmit} className="p-4 border rounded">
            <Button variant="outline-danger" className="mb-3" onClick={closeForm}>
              x
            </Button> 
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>New Name</Form.Label>
              <Form.Control type="text" placeholder="Enter new name" name="name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>New Email</Form.Label>
              <Form.Control type="email" placeholder="Enter new email" name="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProfileImage">
              <Form.Label>New Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="profile_image"
                accept="image/png, image/jpeg, image/gif"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                name="currentpassword"
                required
              />
            </Form.Group>
            <Button variant="light" type="submit" className="w-100">
              Update
            </Button>
          </Form>
        </div>
      );
    } else {
      return (
        <div className="userCredentialChange mt-4">
          <Button onClick={handleModifyProfile} variant="light">
            Edit your profile
          </Button>
        </div>
      );
    }
  };

  // Function for when the user submits the sign in form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newName = event.target.name.value;
    const newEmail = event.target.email.value;
    const newPassword = event.target.password.value;
    const newProfileImage = event.target.profile_image.files[0];

    const currentPassword = event.target.currentpassword.value;

    // Check if any field is filled
    if (!newName && !newEmail && !newPassword && !newProfileImage) {
      alert("No credentials entered!");
      return;
    }

    // Check for changes in name and email
    if (
      newName === currentUser.Name ||
      newEmail === currentUser.Email ||
      (newProfileImage && newProfileImage.name === currentUser.Profile_image)
    ) {
      alert("You cannot use the same credentials!");
      return;
    }

    if (!currentPassword) {
      alert("You must enter your current password!");
      return;
    }

    try {
      await handleCredentialChange(event);
      await refreshProfileData();
    } catch (error) {
      console.error("Error updating credentials:", error);
      alert("Error updating credentials.");
    }
  };

  return (
    <div className="p-3" style={{ height: '90vh', color: 'white' }}>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="text-left">
          <div className="Profile-info p-4 border rounded">
            <Row className="align-items-center">
              <Col md={3}>
                <Image
                  src={currentUser.Profile_image ? `/images/${currentUser.Profile_image}` : ProfileImage}
                  alt={currentUser.Username}
                  roundedCircle
                  className="profile-image mb-3"
                />
              </Col>
              <Col md={9} className="text-left">
                <h4 className="mb-1">{currentUser.Name}</h4>
              </Col>
            </Row>
            {renderUserForm()}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
