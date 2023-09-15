const decryptReferralCode = require("../helper/decryptReferralCode");
const refrealModal = require("../modals/referralModal");

const Referral = async (req, res) => {
    try {
        const { referalCode, transactionHash, poolID, slug, investedAmount, referralTo } = req.body;
        const walletAddress = await decryptReferralCode.decryptReferralCode(referalCode);
        const existingReferral = await refrealModal.findOne({ walletAddress });

        if (existingReferral) {
            existingReferral.transactions.push({
                txID: transactionHash,
                poolID: poolID,
                slug: slug,
                referralBy: walletAddress,
                referralTo: referralTo,
                investedAmount: investedAmount,
            });
            const updatedReferral = await existingReferral.save();
            console.log("API resut for update", updatedReferral);

            return {
                code: 200,
                message: 'Success - Saved referral data to existing record',
                data: updatedReferral,
            };
        } else {

            const obj = {
                walletAddress,
                transactions: [{
                    txID: transactionHash,
                    poolID: poolID,
                    slug: slug,
                    referralBy: walletAddress,
                    referralTo: referralTo,
                    investedAmount: investedAmount
                }]
            };

            const result = await refrealModal.create(obj);

            console.log("API result for new", result);
            return {
                code: 200,
                message: 'Success - Saved referral data as a new record',
                data: result,
            };
        }
    } catch (error) {
        console.error("API Error:", error);
        if (error.name === "ValidationError") {
            return {
                code: 400,
                message: "Bad Request - Validation error",
                error: error.message,
            };
        } else if (error.name === "MongoError" && error.code === 11000) {
            return {
                code: 409,
                message: "Conflict - Duplicate wallet address",
                error: error.message,
            };
        } else {
            return {
                code: 500,
                message: 'Internal Server Error - An error occurred while processing your request',
                error: error.message,
            };
        }
    }
};

module.exports = {
    Referral,
};
