const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const {
  getnotNullValidationMsg,
  getisIntValidationMsg,
  getnotEmptyValidationMsg,
  getLengthValidationMsg,
  isBooleanValidationMsg,
  isStringValidationMsg,
} = require("../models/modelValidationFunction");

const Notes = sequelize.define(
  "note",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    //   set(value) {
    //     this.setDataValue("title", value.toLowerCase());
    //   },
    //   validate: {
    //     notNull: {
    //       msg: getnotNullValidationMsg("Note", "Title"),
    //     },
    //     notEmpty: {
    //       msg: getnotEmptyValidationMsg("Note", "Title"),
    //     },

    //     isString: function (val) {
    //       return isStringValidationMsg(val, "Note", "Title");
    //     },
    //   },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        // set(value) {
        //   this.setDataValue("title", value.toLowerCase());
        // },
        // validate: {
        //   notNull: {
        //     msg: getnotNullValidationMsg("Note", "Description"),
        //   },
        //   notEmpty: {
        //     msg: getnotEmptyValidationMsg("Note", "Description"),
        //   },
  
        //   isString: function (val) {
        //     return isStringValidationMsg(val, "Note", "Description");
        //   },
        // },
      },
    
    
    
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    schema: 'public',
    tableName: "note",
    timestamps: false,
  }
);

// User.hasMany(Feature, { sourceKey: "uid", foreignKey: "created_by" });
// Feature.belongsTo(User, { targetKey: "uid", foreignKey: "created_by" });
// User.hasMany(Feature, { sourceKey: "uid", foreignKey: "updated_by" });
// Feature.belongsTo(User, { targetKey: "uid", foreignKey: "updated_by" });

module.exports = Notes;
