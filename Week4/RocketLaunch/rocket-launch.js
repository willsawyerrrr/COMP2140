// Import dependencies using ES Modules (requires "type": "module" in package.json)
import promptSync from "prompt-sync";
const prompt = promptSync({
    sigint: false
});
import fetch from "node-fetch";
import fs from "fs/promises";

// The main app logic
function main() {
    
    // Declare global variables
    const numDays = 7;
    const numTop = 3;
    const maxDays = 2;
    const launchURL = "https://api.spacexdata.com/v4/launches/";
    const launchpadURL = "https://api.spacexdata.com/v4/launchpads/";
    const jsonFilename = (append) => `spacex-${append}.json`;
    
    /**
     * This function stringifies a given date format similar to UTC format.
     * @param {string} date - a date in UTC format (dd/mm/yyyy).
     * @returns {string} date similar to UTC format.
     */
    function dateStringify(date) {
        let month = new String(date.getMonth() + 1);
        if (month.length < 2) {
            month = `0${month}`;
        }
        let day = new String(date.getDate());
        if (day.length < 2) {
            day = `0${day}`;
        }
        return new String(`${date.getFullYear()}-${month}-${day}`);
    }
    
    /**
     * This function returns a new date offsetted by x days from today.
     * @param {number} days - a number of days to offset by.
     * @returns {Date} object.
     */
    function addDays(days) {
        let today = new Date();
        today.setDate(today.getDate() + days);
        return today;
    }
    
    // Declare date global variables
    
    const today = new Date();
    const todayDate = dateStringify(today);
    const oneDay = addDays(maxDays / 2);
    const oneDayDate = dateStringify(oneDay);
    const twoDay = addDays(maxDays);
    const twoDayDate = dateStringify(twoDay);
    
    // Declare message global variables
    
    let messageWelcome = "Welcome to the SpaceX Rocket Launch Checker!";
    let messageExiting = "Exiting. See you next time!";
    let messageInput = `Please enter \x1b[32mtoday\x1b[0m (${todayDate}) or \x1b[32mtomorrow\x1b[0m (${oneDayDate}) or \x1b[32mday after tomorrow\x1b[0m (${twoDayDate}) to return the number of filtered launches for that day: `;
    let messageInputInvalid = "This isn't one of the valid inputs. Please try again.";
    let messageSaveCache = (filenameAppend) => `Saved a JSON cache file called "${jsonFilename(filenameAppend)}".`;
    let messageReadCache = (filenameAppend) => `Read a JSON cache file called "${jsonFilename(filenameAppend)}".`;
    let messageFetching = (dayIndex, daySelected) => `Fetching data for "${dayIndex}" (${daySelected})...`;
    let messageFetchedLive = (dayIndex, daySelected) => `Successfully fetched live data for "${dayIndex}" (${daySelected}) from the API.`;
    let messageFiltered = (input, daySelectedFiltered) => `For the input of \x1b[32m${input}\x1b[0m, the filtered results are: ${daySelectedFiltered}`;
    
    /**
     * This function takes the user input and converts it into a formatted date.
     * @param {string} input - the user input from the prompt.
     * @returns {string|null} either a formatted date or null when no result.
     */
    function validateDate(input) {
        switch(input) {
            case "today":
                return todayDate;
            case "tomorrow":
                return oneDayDate;
            case "day after tomorrow":
                return twoDayDate;
            default:
                return null;
        }
    }
    
    /**
     * This function fetches data asynchronously based on the URL provided.
     * @param {string} url - the URL to fetch data from (expecting JSON).
     * @returns {string} the JSON response.
     */
    async function fetchData(url) {
        // YOUR CODE HERE
    }
    
    /**
     * This function will fetch launch data and filter the array based on the day.
     * @param {number} day - The selected day in date format
     * @returns {Array} the sorted array of launches based on date_unix and only the same day of the week.
     */
    async function filterLaunches(day) {
        // YOUR CODE HERE
    }
    
    /**
     * This function will populate data from fetched JSON and determine the number of filtered launches for the inputted day.
     * @param {number} input - The validated string as inputted by the user.
     */
    async function combineFetches(input) {
        // YOUR CODE HERE
    }
    
    /**
     * This function will save a JSON cache file with the specified filename & data.
     * @param {string} filenameAppend - The string to append to the JSON filename.
     * @param {string} data - The string containing JSON data to save.
     */
    async function saveCache(filenameAppend, data) {
        // YOUR CODE HERE
    }
    
    /**
     * This function will read a JSON cache file with the specified filename.
     * @param {string} filenameAppend - The string to append to the JSON filename.
     * @returns {string} the JSON data from the cache file.
     */
    async function readCache(filenameAppend) {
        // YOUR CODE HERE
    }
    
    // Synchronous prompt logic
    let day = null;
    let input;
    while (true) {
        console.log(messageWelcome);
        // Prompt the user for input
        input = prompt(messageInput);
        if (input === null) {
            break;
        }
        // Validate against expected inputs
        day = validateDate(input);
        if (day === null) {
            console.log(messageInputInvalid);
        }
        else {
            break;
        }
    }
    if (day === null) {
        console.log(messageExiting);
    }
    else {
        // Run fetches to get data
        combineFetches(input);
    }
    
}

main();