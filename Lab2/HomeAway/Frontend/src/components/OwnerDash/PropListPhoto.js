import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postPhotos } from "../../actions/photosAction";
import PropTypes from "prop-types";
import * as Validate from "../Validations/datavalidation";
class PropListPhoto extends Component {
  imageNameArr = [];
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler = e => {
    e.preventDefault();
    var photosName = this.imageNameArr;
    console.log(this.imageNameArr);
    this.props.handlerParentforPhotos(photosName);
    alert("Property Photos name submitted");
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.photos.photos) {
  //     console.log(this.imageNameArr);
  //     var photosName = this.imageNameArr;
  //     this.props.handlerParentforPhotos(photosName);
  //   }
  // }

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      this.uid = new Date().valueOf();
      formData.append("imagename", file.name);
      this.imageNameArr.push(file.name);

      console.log(file.name);
      console.log(this.imageNameArr);

      formData.append("timestamp", (Date.now() / 1000) | 0);

      this.props.postPhotos(formData);
      alert("Photos uploaded to the server");
    });
  };

  render() {
    return (
      <div>
        <br />
        <div
          class="panel panel-default"
          style={{ width: "800px", height: "550px" }}
        >
          <div class="panel-heading" style={{ fontSize: "25px" }}>
            {"     "}
            <b>Add between 2-5 photos</b>
          </div>

          <div class="pyl-photos-container">
            <div class="pyl-photos-content">
              <br />
              <div>
                <div class="pyl-photos-subheading">
                  Showcase your property’s best features (no pets or people,
                  please). Requirements: JPEG, at least 1920 x 1080 pixels, less
                  than 20MB file size, 2 photos minimum and 5 photos maximum.
                  &nbsp;
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
                    <h3
                      class="photo-drop-title text-muted"
                      style={{ textAlign: "center" }}
                    >
                      Drop photos here,
                    </h3>
                    <h3
                      class="photo-drop-error text-muted"
                      style={{ textAlign: "center" }}
                    >
                      Only JPEG images are supported
                    </h3>
                    <div>
                      <Dropzone
                        onDrop={this.handleDrop}
                        multiple
                        accept="image/*"
                        type="file"
                      >
                        <div>Drop files to upload.</div>
                      </Dropzone>
                    </div>
                    <b>
                      Just Drag and drop photos to the box and press Save
                      Changes, <br /> Thank You, Happy Travelling. :)
                    </b>

                    <hr />
                    <label class="col-md-4 control-label" />
                    <div class="col-md-4">
                      <button
                        type="submit"
                        class="btn btn-success"
                        value="Save"
                        onClick={this.submitHandler}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PropListPhoto.propTypes = {
  postPhotos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  photos: state.photos
});

export default connect(
  mapStateToProps,
  { postPhotos }
)(withRouter(PropListPhoto));
