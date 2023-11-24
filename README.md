<h1>Assignment-2 Next level Web Course</h1>

<h2>Prerequisites:</h2>
<p>Install Node and Git into your Local Machine</p>

<h2>How to Run?</h2>
<h4>To Clone The repository: Run following command to your command/terminal</h4>
<code>git clone https://github.com/engrkashem/assignment_2_level_2_node_express_mongoose.git</code>

<h4>Go to the project directory:</h4>
<code>cd assignment_2_level_2_node_express_mongoose</code>

<h4>Install Dependency Packages:</h4>
<code>npm install</code>

<h4>Create .env file to project root directory and configure the following environment variables:</h4>
<code>PORT=5000</code>  |  
<code>DB_URL="your mongodb connection urls"</code>  |  
<code>BCRYPT_SALT_ROUNDS=10</code>

<h4>Run the Server:</h4>
<code>npm run dev</code>

<h2>Available APIs</h2>

<h4>Create user:(POST)</h4>
<code>http://localhost:5000/api/users</code>
<h4>Get all user:(GET)</h4>
<code>http://localhost:5000/api/users</code>
<h4>Get user by id:(GET)</h4>
<code>http://localhost:5000/api/users/${userId}</code>
<h4>Update a user info:(PUT)</h4>
<code>http://localhost:5000/api/users/${userId}</code>
<h4>Delete a user :(DELETE)</h4>
<code>http://localhost:5000/api/users/${userId}</code>
<h4>Add order to user orders :(PUT)</h4>
<code>http://localhost:5000/api/users/${userId}/orders</code>
<h4>Get all order of a user :(GET)</h4>
<code>http://localhost:5000/api/users/${userId}/orders</code>
<h4>Get total price of a user orders :(GET)</h4>
<code>http://localhost:5000/api/users/${userId}/orders/total-price</code>
