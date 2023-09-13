const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referralSchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true,
    },
    transactions: [
        {
            txID: { type: String, required: true },
            poolID: { type: String, required: true },
            transactAt: { type: Date, default: Date.now, required: true }
        }
    ],
});

module.exports = mongoose.model("Referral", referralSchema);
