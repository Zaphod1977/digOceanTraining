const schedule = require('node-schedule');
const { deleteOldEntries } = require('./yourDatabaseModule'); // Replace with your actual database module

function setupAutoDeleteJob() {
    // Schedule the auto-delete job to run every day at midnight
    schedule.scheduleJob('0 0 * * *', () => {
        console.log('Running auto-delete job...');
        deleteOldEntries();
    });
}

module.exports = autoDelete;