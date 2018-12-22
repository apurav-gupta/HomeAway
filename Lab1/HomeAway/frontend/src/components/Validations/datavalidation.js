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
    msg = "Enter correct Phone Number";
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
    data.mailid === "" ||
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

  if (!emailPattern.test(data.mailid)) {
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
