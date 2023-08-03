
// const mongoose = require("mongoose");

// const formSchema = new mongoose.Schema({
//   formName: {
//     type: String,
//     // required: true,
//   },
//   step: {
//     type: Number,
//     // required: true,
//   },
//   layoutName: {
//     type: String,
//     // required: true,
//   },
//   formData: [
//     {
//       type: Object,
//       // required: true,
//     },
//   ],
// });

// const FormModel = mongoose.model("Form", formSchema);

// module.exports = FormModel;
//////////////////////////////////////////////////////////////////////////////////////////
// const formSchema = new mongoose.Schema({
//   title: { type: String, required: true },

//   steps: [
//     {
//       title: { type: String, required: true }, //step name
//       fields: [ 
//         {
//           label: { type: String, required: true },
//           type: { type: String, required: true },
//           options: [String],
//           required: { type: Boolean, default: false },
//         },
//         {
//           label: { type: String, required: true },
//           type: { type: String, required: true },
//           options: [String],
//           required: { type: Boolean, default: false },
//         },
//       ],
//     },
//     {
//       title: { type: String, required: true },
//       fields: [
//         {
//           label: { type: String, required: true },
//           type: { type: String, required: true },
//           options: [String],
//           required: { type: Boolean, default: false },
//         },
//       ],
//     },
//     {
//       title: { type: String, required: true },
//       fields: [
//         {
//           label: { type: String, required: true },
//           type: { type: String, required: true },
//           options: [String],
//           required: { type: Boolean, default: false },
//         },
//       ],
//     },
//   ],
// });

// const FormModel = mongoose.model("Form", formSchema);

// module.exports = FormModel;

/////////////////////////////////////////////////////////////////////////////////
// formLayoutModel.js (Mongoose schema)

// const mongoose = require("mongoose");

// const fieldSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     // required: true,
//   },
//   label: {
//     type: String,
//     // required: true,
//   },
//   options: [String], // Array of options, used for dropdown fields (optional)
// });

// const layoutEntrySchema = new mongoose.Schema({
//   step: {
//     type: String,
//     // required: true,
//   },
//   name: {
//     type: String,
//     // required: true,
//   },
//   fields: [
//     {
//       type: {
//         type: String,
//         // required: true,
//       },
//       label: {
//         type: String,
//         // required: true,
//       },
//       options: [String],
//     },
//   ], // Array of fields for each layout entry
// });

// const FormLayoutModel = mongoose.model("FormLayout", layoutEntrySchema);

// module.exports = FormLayoutModel;

/////////////////////////////////////////////////////////////////////

// models/formDataModel.js

// const mongoose = require("mongoose");

// const formDataSchema = new mongoose.Schema({
//   formName: {
//     type: String,
//     required: true,
//   },
//   step: {
//     type: Number,
//     required: true,
//   },
//   fields: [
//     {
//       type: {
//         type: String,
//         required: true,
//       },
//       label: {
//         type: String,
//         required: true,
//       },
//       options: [String],
//     },
//   ],
// });

// const FormDataModel = mongoose.model("FormDatas", formDataSchema);

// module.exports = FormDataModel;
/////////////////////////////////////////////31


const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    // required: true,
  },
  label: {
    type: String,
    // required: true,
  },
  options: [String], // Array of options, used for dropdown fields (optional)
});

const layoutEntrySchema = new mongoose.Schema({
  name: {
      type: String,
      // required: true,
    },
  step: {
    type: String,
    // required: true,
  },
  fields: [
    {
      type: {
        type: String,
        // required: true,
      },
      label: {
        type: String,
        // required: true,
      },
      options: [String],
    },
  ], 
});

const FormLayoutModel = mongoose.model("FormLayout", layoutEntrySchema);

module.exports = FormLayoutModel;

// tesing eveingn 31 6.59 top working

// const mongoose = require("mongoose");


// const layoutEntrySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     // required: true,
//   },
//   step: {
//     type: String,
//     // required: true,
//   },
//   fields: [
//     {
//       type: {
//         type: String,
//         // required: true,
//       },
//       label: {
//         type: String,
//         // required: true,
//       },
//       options: [String],
//     },
//   ],
// });
// const FormLayoutModel = mongoose.model("FormLayout", layoutEntrySchema);

// module.exports = FormLayoutModel;