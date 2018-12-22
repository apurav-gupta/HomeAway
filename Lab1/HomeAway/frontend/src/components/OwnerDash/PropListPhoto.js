import React, { Component } from "react";
import axios from "axios";
class PropListPhoto extends Component {
  constructor() {
    super();
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.state = {
      imageUrl: ""
    };
  }

  handleUploadFile = event => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", "some value user types");
    data.append("description", "some value user types");
    axios.post("/files", data).then(response => {
      this.setState({
        imageUrl: response.data.fileUrl
      });
    });
  };

  render() {
    return (
      <div>
        <div>
          <div class="panel panel-default pyl-photos">
            <div class="le-nav-header panel-heading">
              <h1 class="nav-header-text">
                Add up to 50 photos of your property
              </h1>
            </div>

            <div class="pyl-photos-container">
              <div class="pyl-photos-content">
                <br />
                <div>
                  <div class="pyl-photos-subheading">
                    Showcase your property’s best features (no pets or people,
                    please). Requirements: JPEG, at least 1920 x 1080 pixels,
                    less than 20MB file size, 6 photos minimum.
                    <br />
                    <a
                      href="http://www.realtourvision.com/vacation-rental-photos.php"
                      target="_blank"
                    >
                      Need photos? Hire a professional.
                    </a>
                  </div>
                </div>
                <div class="pyl-photos-photo-drop">
                  <div id="inside-upload-area">
                    <div class="pyl-photos-photo-drop-inside">
                      <h1
                        class="photo-drop-title text-muted"
                        style={{ textAlign: "center" }}
                      >
                        Drop photos here
                      </h1>
                      <h1
                        class="photo-drop-OR text-muted"
                        style={{ textAlign: "center" }}
                      >
                        or
                      </h1>
                      <h1
                        class="photo-drop-error text-muted"
                        style={{ textAlign: "center" }}
                      >
                        Only JPEG images are supported
                      </h1>
                      <div>
                        <label
                          for="uploadPhotoInput"
                          class="photo-drop-button btn btn-default center-block"
                        >
                          SELECT PHOTOS TO UPLOAD
                          <input
                            type="file"
                            id="uploadPhotoInput"
                            multiple="true"
                            value=""
                          />
                        </label>
                      </div>
                      <div class=" container photo-drop-info small text-muted">
                        <b>
                          0 of 5 uploaded. 2 are required. You can choose to
                          upload more than one photo at a time.
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pyl-photos-shot-list" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropListPhoto;
