const dotenv = require("dotenv").config();

const app = require("./index");

const port = process.env.port || 80;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

