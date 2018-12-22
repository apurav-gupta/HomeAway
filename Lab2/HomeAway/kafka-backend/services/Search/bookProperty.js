//Load Properties Model
const Properties = require("../../models/Properties");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  var book_start_date = new Date(msg.bookstartdate);
  var book_end_date = new Date(msg.bookenddate);
  console.log(book_start_date);
  console.log(book_end_date);

  Properties.update(
    { _id: msg.property_id },
    {
      $set: {
        isbooked: msg.isbooked,
        customermail: msg.custmail,
        bookstartdate: book_start_date,
        bookenddate: book_end_date
      }
    },
    (err, result) => {
      if (err) {
        console.log("Something wrong when booking!");
        console.log(err);
        res.code = "400";
        res.value = "Something wrong when booking!";
        callback(null, res);
      } else {
        console.log(result);
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
