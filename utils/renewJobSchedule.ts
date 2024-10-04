import FormModel from "../src/models/form.model";

const cron = require('node-cron');

// Schedule the cron job to run every December 31st at midnight
export const renewJobSchedule = ()=> 
  {
    cron.schedule('0 0 31 12 *', async () => {
  try {
    // Update the boolean field to false for all documents
    await FormModel.updateMany({}, { $set: { renewed: false } });
    console.log('Boolean field set to false for all documents');
  } catch (error) {
    console.error('Error updating documents:', error);
  }
});
  }