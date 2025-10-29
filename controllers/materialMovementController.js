const RackMasterTable = require('../models/rackMasterTable');
const PrimaryStorage = require('../models/primaryStorage');

// Get empty rack API
const getEmptyRack = async (req, res) => {
  try {
    const { plant_id } = req.query;

    if (!plant_id) {
      return res.status(400).json({
        success: false,
        message: 'plant_id is required'
      });
    }

    // Query to get first empty rack 
    const emptyRack = await RackMasterTable.find({
      plant_id: plant_id,
      status: "unoccupied"
    })
    .sort({ rack_id: 1, unit_no: 1, location_id: 1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(1);

    if (emptyRack.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No empty racks available'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Empty rack found',
      data: emptyRack[0]
    });

  } catch (error) {
    console.error('Error getting empty rack:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Store material in primary storage API
const storeMaterial = async (req, res) => {
  try {
    const {
      plant_id,
      unit_no,
      rack_id,
      level_id,
      column_id,
      location_id,
      material_code,
      material_name,
      carrier_count,
      total_stock,
      uom,
      pallet_barcode
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'plant_id', 'unit_no', 'rack_id', 'level_id', 'column_id', 
      'location_id', 'material_code', 'material_name', 'carrier_count', 
      'total_stock', 'uom', 'pallet_barcode'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Check if the rack exists and is unoccupied
    const rack = await RackMasterTable.findOne({
      location_id: location_id,
      status: 'unoccupied'
    });

    if (!rack) {
      return res.status(400).json({
        success: false,
        message: 'Rack not found or already occupied'
      });
    }

    // Create new primary storage entry
    const primaryStorageData = {
      plant_id,
      unit_no,
      rack_id,
      level_id,
      column_id,
      location_id,
      material_code,
      material_name,
      carrier_count,
      total_stock,
      uom,
      pallet_barcode
    };

    const newPrimaryStorage = new PrimaryStorage(primaryStorageData);
    await newPrimaryStorage.save();

    // Update rack status to occupied
    await RackMasterTable.findOneAndUpdate(
      { location_id: location_id },
      { status: 'occupied' },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Material stored successfully and rack status updated',
      data: newPrimaryStorage
    });

  } catch (error) {
    console.error('Error storing material:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getEmptyRack,
  storeMaterial
};
