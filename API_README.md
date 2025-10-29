
## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```


## API Endpoints

### 1. Get Empty Rack
- **URL**: `GET /api/material-movement/empty-rack`
- **Query Parameters**: 
  - `plant_id` (required): Plant ID to search for empty racks
- **Response**: Returns the first available empty rack based on the sorting criteria
- **Note**: Use `plant_id` as "prasad_dc" for testing

### 2. Store Material
- **URL**: `POST /api/material-movement/store-material`
- **Body**: All fields for primary_storage collection:
  - `plant_id` (string, required)
  - `unit_no` (number, required)
  - `rack_id` (string, required)
  - `level_id` (string, required)
  - `column_id` (string, required)
  - `location_id` (string, required)
  - `material_code` (string, required)
  - `material_name` (string, required)
  - `carrier_count` (number, required)
  - `total_stock` (number, required)
  - `uom` (string, required)
  - `pallet_barcode` (string, required)

**Example Request Body:**
```json
{
  "plant_id": "prasad_dc",
  "unit_no": 1,
  "rack_id": "R1",
  "level_id": "L1",
  "column_id": "A1",
  "location_id": "R1L1A1",//This value should be obtained from empty-rack API
  "material_code": "WC0001000102420664",
  "material_name": "MDM PONNI BOILD RICE DLXBULK PCK 25kg",
  "carrier_count": 20,
  "total_stock": 500,
  "uom": "PAC",
  "pallet_barcode": "PLT1111"
}
```

## Database Collections

### rack_master_table
Stores rack availability information with fields:
- `plant_id`, `unit_no`, `rack_id`, `level_id`, `column_id`, `location_id`, `status`

### primary_storage
Stores material details with all the fields mentioned in the API body above.


