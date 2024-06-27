const mongoose = require('mongoose');

// Define the StockSchema
const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    beta: {
        type: Number,
        required: true
    },
    debt_to_equity_ratio: {
        type: Number,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    current_price: {
        type: Number,
        required: true
    },
    annual_return_percentage: {
        type: Number,
        required: true
    },
    dividend_yield: {
        type: Number,
        required: true
    }
});

const stockData = mongoose.model('stocks', StockSchema);

// Define the UserInformation schema
const UserInformationSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    payment: {
        type: Number,
        default: 0
    },
    appointmentBook: {
        type: Number,
        default: 0
    },
    portfolio: [{
        stockDetails: {
            type: StockSchema,
            required: true
        }
    }]
});

const UserDataSignUp = mongoose.model('users', UserInformationSchema);

// Define the ProfileSchema
const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    }
});

const expertData = mongoose.model('expertsdetails', ProfileSchema);

module.exports = { UserDataSignUp, expertData, stockData };
