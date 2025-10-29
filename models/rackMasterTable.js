const mongoose = require('mongoose');

const rackMasterTableSchema = new mongoose.Schema({
  plant_id: {
    type: String,
    required: true
  },
  unit_no: {
    type: Number,
    required: true
  },
  rack_id: {
    type: String,
    required: true
  },
  level_id: {
    type: String,
    required: true
  },
  column_id: {
    type: String,
    required: true
  },
  location_id: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['occupied', 'unoccupied'],
    default: 'unoccupied',
    required: true
  }
}, {
  timestamps: true
});

// Create index for efficient querying
rackMasterTableSchema.index({ plant_id: 1, status: 1 });
rackMasterTableSchema.index({ rack_id: 1, unit_no: 1, location_id: 1 });

module.exports = mongoose.model('rack_master_table', rackMasterTableSchema);
