import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div class="panel panel-default" style={{ width: "1000px" }}>
        <div class="panel-heading" style={{ fontSize: "30px" }}>
          <i class="fa fa-map-marker" style={{ fontSize: "30px" }} />
          {"     "}
          Property location
        </div>
        <div class="panel-body">
          <Field
            name="proploc"
            type="text"
            component={renderField}
            label="First Name"
          />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage);
