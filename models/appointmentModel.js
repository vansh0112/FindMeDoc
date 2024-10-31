const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Doctor model
        ref: "doctors", // The name of the Doctor model
        required: true,
      },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "users", // The name of the User model
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
appointmentModel
  .find()
  .populate("doctorInfo") // Populate the doctorInfo field with data from the Doctor model
  .populate("userInfo")   // Populate the userInfo field with data from the User model
  .exec(function(err, appointments) {
    if (err) {
      console.error(err);
      return;
    }
    // Now, appointments will contain the actual doctor and user data, not just ObjectIDs.
    console.log(appointments);
  });

module.exports = appointmentModel;
