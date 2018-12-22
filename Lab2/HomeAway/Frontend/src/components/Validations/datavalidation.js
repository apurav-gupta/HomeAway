export const signup = data => {
  let msg = "";
  const namePattern = /^[a-zA-Z\s]+$/;
  const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{8,}$/;

  if (
    data.firstname === "" ||
    data.lastname === "" ||
    data.email === "" ||
    data.password === ""
  ) {
    msg = "All fields are mandatory. Please fill all details";
    return msg;
  }
  if (!namePattern.test(data.firstname)) {
    msg = "Enter correct First Name";
    return msg;
  }
  if (!namePattern.test(data.lastname)) {
    msg = "Enter correct Last Name";
    return msg;
  }
  if (!emailPattern.test(data.email)) {
    msg = "Enter correct Email Address";
    return msg;
  }
  if (data.password.length < 8 || data.password.length > 14) {
    msg = "Password must be 8 to 15 character long";
    return msg;
  }
  if (!passwordPattern.test(data.password)) {
    msg =
      "Password should contain one small letter, \n one capital letter, one digit \nand one special character @ ";
    return msg;
  }
  return msg;
};

/*******************************OWNER SIGN UP VALIDATION ************************* */

export const ownSignup = data => {
  let msg = "";
  const namePattern = /^[a-zA-Z\s]+$/;
  const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{8,}$/;
  const phonePattern = /^\+[1][\s-(]?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;

  if (
    data.firstname === "" ||
    data.lastname === "" ||
    data.email === "" ||
    data.password === "" ||
    data.phonenumber === ""
  ) {
    msg = "All fields are mandatory. Please fill all details";
    return msg;
  }
  if (!namePattern.test(data.firstname)) {
    msg = "Enter correct First Name";
    return msg;
  }
  if (!namePattern.test(data.lastname)) {
    msg = "Enter correct Last Name";
    return msg;
  }
  if (!emailPattern.test(data.email)) {
    msg = "Enter correct Email Address";
    return msg;
  }
  if (data.password.length < 8 || data.password.length > 14) {
    msg = "Password must be 8 to 15 character long";
    return msg;
  }
  if (!passwordPattern.test(data.password)) {
    msg =
      "Password should contain one small letter, \n one capital letter, one digit \nand one special character @ ";
    return msg;
  }
  if (!phonePattern.test(data.phonenumber)) {
    msg =
      "Enter correct Phone Number. Phone number should be in following format: +(X)-(XXX)-(XXXX)";
    return msg;
  }
  return msg;
};

/************************************Customer and Owner Login************************ */

export const login = data => {
  let msg = "";
  const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (data.username === "" || data.password === "") {
    msg = "All fields are mandatory. Please fill all details";
    return msg;
  }
  if (!emailPattern.test(data.username)) {
    msg = "Enter correct email";
    return msg;
  }
  return msg;
};

/************************Update Customer Profile ************************** */

export const update = data => {
  let msg = "";
  const namePattern = /^[a-zA-Z\s]+$/;

  const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const phonePattern = /^\+[1][\s-(]?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;

  //const statePattern = /^(?-i:A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/;

  if (
    data.firstname === "" ||
    data.lastname === "" ||
    data.email === "" ||
    data.about === "" ||
    data.street === "" ||
    data.city === "" ||
    data.state === "" ||
    data.country === "" ||
    data.work === "" ||
    data.school === "" ||
    data.hometown === "" ||
    data.primarycontact === "" ||
    data.secondarycontact === ""
  ) {
    msg = "All fields are mandatory. Please fill all details";
    return msg;
  }
  if (!namePattern.test(data.firstname)) {
    msg = "Enter correct First Name";
    return msg;
  }

  if (!namePattern.test(data.lastname)) {
    msg = "Enter correct Last Name";
    return msg;
  }

  if (!emailPattern.test(data.email)) {
    msg = "Enter correct email";
    return msg;
  }

  if (!namePattern.test(data.street)) {
    msg = "Enter correct city";
    return msg;
  }

  if (!namePattern.test(data.city)) {
    msg = "Enter correct city";
    return msg;
  }

  if (!namePattern.test(data.state)) {
    msg = "Enter correct state";
    return msg;
  }

  if (!namePattern.test(data.country)) {
    msg = "Enter correct city";
    return msg;
  }

  if (!namePattern.test(data.work)) {
    msg = "Enter correct city";
    return msg;
  }

  if (!namePattern.test(data.school)) {
    msg = "Enter correct state";
    return msg;
  }

  if (!namePattern.test(data.hometown)) {
    msg = "Enter correct city";
    return msg;
  }
  if (!phonePattern.test(data.primarycontact)) {
    msg = "Enter correct Phone Number";
    return msg;
  }
  if (!phonePattern.test(data.secondarycontact)) {
    msg = "Enter correct Phone Number";
    return msg;
  }
  return msg;
};

/***************************Property Search ************************ */

export const propSearch = data => {
  let msg = "";
  const namePattern = /^[a-zA-Z\s]+$/;

  let startDate = new Date(data.startDate);
  let endDate = new Date(data.endDate);

  if (data.location === "" || data.startDate === "" || data.endDate === "") {
    msg = "All fields are mandatory. Please fill all details";
    alert("All fields are mandatory. Please fill all details");
    return msg;
  }
  if (!namePattern.test(data.location)) {
    msg = "Enter correct Place";
    return msg;
  }
  if (startDate > endDate) {
    msg = "Check out date should be after the check in date";
    return msg;
  }
  return msg;
};

export const propFilter = data => {
  let msg = "";
  if (data.pricemax === "" || data.pricemin === "") {
    if (data.bedrooms !== "") return msg;
    else {
      msg =
        "Price Minimum and Price Maximum are mandatory. Please fill both of them";

      alert(
        "Price Minimum and Price Maximum are mandatory. Please fill both of them"
      );
      return msg;
    }
  }
  if (data.pricemin > data.pricemax) {
    console.log(data.pricemax);
    console.log(data.pricemin);
    msg = "Maximum Price should be greater than the Minimum Price";
    alert("Maximum Price should be greater than the Minimum Price");
    return msg;
  }
  return msg;
};

/*************************List a property Vaidations ************ */

export const listavailprice = data => {
  let msg = "";
  if (
    data.arrivedate === "" ||
    data.departdate === "" ||
    data.currtype === "" ||
    data.price === ""
  ) {
    msg = "All fields are mandatory. Please fill all details";
    return msg;
  }
  return msg;
};

export const listdetail = data => {
  let msg = "";
  if (
    data.headline === "" ||
    data.about === "" ||
    data.proptype === "" ||
    data.bed === "" ||
    data.accomodate === "" ||
    data.bath === ""
  ) {
    msg = "All fields are mandatory. Please fill all details";
    return msg;
  }
  return msg;
};

export const listloc = data => {
  let msg = "";
  if (data.proploc === "") {
    msg = "All fields are mandatory. Please fill all details";
    return msg;
  }
  return msg;
};
