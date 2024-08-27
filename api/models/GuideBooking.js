const mongoose = require('mongoose');

const guideBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  bookingDate: { type: Date, required: true },  // Ensure bookingDate is included
});

const GuideBooking = mongoose.model('GuideBooking', guideBookingSchema);

module.exports = GuideBooking;
