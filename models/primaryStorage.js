const mongoose = require('mongoose');

const primaryStorageSchema = new mongoose.Schema({
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
    required: true
  },
  material_code: {
    type: String,
    required: true
  },
  material_name: {
    type: String,
    required: true
  },
  carrier_count: {
    type: Number,
    required: true
  },
  total_stock: {
    type: Number,
    required: true
  },
  uom: {
    type: String,
    required: true
  },
  pallet_barcode: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index for efficient querying
primaryStorageSchema.index({ location_id: 1 });
primaryStorageSchema.index({ material_code: 1 });
primaryStorageSchema.index({ pallet_barcode: 1 });

module.exports = mongoose.model('primary_storage', primaryStorageSchema);
