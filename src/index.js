// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// i chosed Promise chaining via async/await syntax because it help me to handel erros
async function getUserData(id) {

    // 1 - checks if the id is within the valid range (1 to 10)
  if (id < 1 || id > 10 || typeof id !== 'number') {
    return Promise.reject(new Error(`Invalid database returned: ${index}`));
  }

  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
    };

try {
    // 2 -  check central database to determine which db to use for basic info
    const index = await central(id);  // index will be db1, db2, or db3

    // Check that the returned index is a valid key in the dbs object
     if (!dbs[index]) {
        return Promise.reject(new Error('Invalid ID provided'));
    }

    // 3 -  Using Promise.all to handle requests concurrently where applicable
    const [basicInfo, personalInfo] = await Promise.all([
      dbs[index](id), // Get basic info from the corresponding db (db1, db2, db3)
      vault(id) 
     ]);



   // 4 - Combine all data into an object
    const userData = {
      id: id,
      name: personalInfo.name,
      username: basicInfo.username,
      email: personalInfo.email,
      address: personalInfo.address,
      phone: personalInfo.phone,
      website: basicInfo.website,
      company: basicInfo.company,
      };

    // 5 - Return combiened data   
      return userData;

} catch (error) {
    // Handle errors
    console.error('Error fetching user data:', error);
    return Promise.reject(new Error('Failed to fetch user data: ' + error.message));
}
 
}


// Try the code : 

getUserData(1).then(userData => {
    console.log(userData);
  })
  .catch(error => {
    console.error(error);
  });